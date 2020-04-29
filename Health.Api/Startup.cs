using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Health.Api
{
    using System.IO;
    using System.Text.Json;
    using Common.Auth;
    using Common.Config;
    using Common.KeyVault;
    using Common.Telemetry;
    using Microsoft.AspNetCore.Mvc;

    public class Startup
    {
        private ILogger<Startup> Logger { get; }
        
        public Startup(ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger<Startup>();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            SetupDI(services);
            SetupAuth(services);
            SetupCors(services);
            SetupMvc(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseHealthChecks("/status");

            // CORS
            app.UseCors("cors");

            if (!env.IsDevelopment())
            {
                app.UseHttpsForAadRedirect();
            }
            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseMvc();
        }
        
        private void SetupDI(IServiceCollection services)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true, reloadOnChange: false)
                .AddEnvironmentVariables()
                .Build();
            services.AddSingleton<IConfiguration>(config);
            Console.WriteLine(@"registered configuration");

            // options
            services
                .ConfigureSettings<AppInsightsSettings>()
                .ConfigureSettings<PrometheusMetricSettings>()
                .ConfigureSettings<AadSettings>()
                .ConfigureSettings<VaultSettings>()
                .AddOptions();

            // kv client
            services.AddKeyVault(config);

            // app insights metrics and logging
            services.AddAppInsights(config, Logger);

            // contract implementation
            services.AddHealthChecks();
        }
        
        private void SetupAuth(IServiceCollection services)
        {
            var svcProvider = services.BuildServiceProvider();
            var config = svcProvider.GetRequiredService<IConfiguration>();
            services.AddAadAuthentication(config);
            services.AddAadAuthorization();
        }
        
        private void SetupCors(IServiceCollection services)
        {
            services
                .AddCors(options =>
                {
                    options.AddPolicy("cors", builder =>
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                    );
                    options.AddPolicy("Download Reports", builder =>
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .WithMethods("POST")
                            .WithExposedHeaders("Content-Disposition"));
                });
        }
        
        private void SetupMvc(IServiceCollection services)
        {
            services
                .AddMvc(opts =>
                {
                    opts.EnableEndpointRouting = false;
                })
                .AddJsonOptions(opt =>
                {
                    opt.JsonSerializerOptions.IgnoreNullValues = true;
                    opt.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                })
                .SetCompatibilityVersion(CompatibilityVersion.Latest)
                .AddControllersAsServices();
        }
    }
}
