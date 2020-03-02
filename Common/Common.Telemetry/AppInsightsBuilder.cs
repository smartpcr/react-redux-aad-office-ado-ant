using System;
using System.IO;
using Common.Config;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.DependencyCollector;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.WindowsServer.TelemetryChannel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.ApplicationInsights;

namespace Common.Telemetry
{
    public static class AppInsightsBuilder
    {
        public static IServiceCollection AddAppInsights(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var instrumentationKey = GetInstrumentationKey(configuration);

            var serviceProvider = services.BuildServiceProvider();
            if (serviceProvider.GetService<IHostingEnvironment>() == null)
            {
                // HACK: trick ApplicationInsights if not running under WebHost!
                services.TryAddSingleton<IHostingEnvironment, SelfHostingEnvironment>();
            }

            var settings = configuration.GetConfiguredSettings<AppInsightsSettings>();
#pragma warning disable 618
            var appInsightsConfig = TelemetryConfiguration.Active;
#pragma warning restore 618
            appInsightsConfig.InstrumentationKey = instrumentationKey;
            appInsightsConfig.TelemetryInitializers.Add(new OperationCorrelationTelemetryInitializer());
            appInsightsConfig.TelemetryInitializers.Add(new HttpDependenciesParsingTelemetryInitializer());
            appInsightsConfig.TelemetryInitializers.Add(new ContextTelemetryInitializer(settings));
            var module = new DependencyTrackingTelemetryModule();
            module.IncludeDiagnosticSourceActivities.Add("Microsoft.Azure.ServiceBus");
            module.IncludeDiagnosticSourceActivities.Add("Microsoft.Azure.EventHubs");
            module.IncludeDiagnosticSourceActivities.Add("Microsoft.Azure.KeyVault");
            module.IncludeDiagnosticSourceActivities.Add("Microsoft.Azure.DocumentDB");
            module.Initialize(appInsightsConfig);

            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var isProdEnv = string.IsNullOrEmpty(env) ||
                            env.Equals("prod", StringComparison.OrdinalIgnoreCase) ||
                            env.Equals("production", StringComparison.OrdinalIgnoreCase);
            AddApplicationInsightsStorage(services, isProdEnv);
            var options = new ApplicationInsightsServiceOptions
            {
                InstrumentationKey = instrumentationKey,
                DeveloperMode = !isProdEnv,
                EnableDebugLogger = !isProdEnv,
                AddAutoCollectedMetricExtractor = true,
                EnableAdaptiveSampling = false,
            };
            options.DependencyCollectionOptions.EnableLegacyCorrelationHeadersInjection = true;
            options.RequestCollectionOptions.InjectResponseHeaders = true;
            options.RequestCollectionOptions.TrackExceptions = true;
            services.AddApplicationInsightsTelemetry(options);
            services.AddAppInsightsLogging(configuration);
            services.TryAddSingleton<IAppTelemetry>(sp => new AppTelemetry(
                settings.Role,
                sp.GetRequiredService<TelemetryClient>()));

            return services;
        }

        private static void AddAppInsightsLogging(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddLogging(builder =>
            {
                builder.AddConfiguration(configuration.GetSection("Logging"));
                builder.AddConsole();
                builder.AddApplicationInsights(GetInstrumentationKey(configuration));
                builder.AddFilter<ApplicationInsightsLoggerProvider>("", LogLevel.Information);
            });
        }

        private static string GetInstrumentationKey(IConfiguration configuration)
        {
            var instrumentationKey =
                Environment.GetEnvironmentVariable("APPINSIGHTS_INSTRUMENTATIONKEY") ??
                configuration.GetSection("AppInsightsSettings:InstrumentationKey").Value;

            if (string.IsNullOrEmpty(instrumentationKey))
            {
                throw new InvalidOperationException("App insights instrumentation key is not configured");
            }

            return instrumentationKey;
        }

        private static void AddApplicationInsightsStorage(IServiceCollection services, bool isProd)
        {
            var aiStorage = Path.Combine(Path.GetTempPath(), "appinsights-store");
            if (!Directory.Exists(aiStorage))
            {
                Directory.CreateDirectory(aiStorage);
            }
            services.TryAddSingleton<ITelemetryChannel>(new ServerTelemetryChannel()
            {
                StorageFolder = aiStorage,
                DeveloperMode = !isProd
            });
        }
    }
}