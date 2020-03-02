// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Allocation.cs" company="Microsoft Corporation">
//   Copyright (c) 2020 Microsoft Corporation.  All rights reserved.
// </copyright>
// <summary>
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Threading.Tasks;
using Common.Auth;
using Common.Config;
using Microsoft.Azure.KeyVault;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Common.KeyVault
{
    public static class KeyVaultBuilder
    {
        public static IServiceCollection AddKeyVault(this IServiceCollection services, IConfiguration configuration)
        {
            var aadSettings = configuration.GetConfiguredSettings<AadSettings>();
            var authBuilder = new AadAuthBuilder(aadSettings);

            Task<string> AuthCallback(string authority, string resource, string scope) => authBuilder.GetAccessTokenAsync(resource);
            var kvClient = new KeyVaultClient(AuthCallback);
            services.AddSingleton<IKeyVaultClient>(kvClient);

            return services;
        }
    }
}