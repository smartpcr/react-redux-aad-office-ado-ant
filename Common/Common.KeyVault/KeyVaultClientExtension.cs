// --------------------------------------------------------------------------------------------------------------------
// <copyright file="KeyVaultClientExtension.cs" company="Microsoft Corporation">
//   Copyright (c) 2020 Microsoft Corporation.  All rights reserved.
// </copyright>
// <summary>
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Common.KeyVault
{
    using System;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using Microsoft.Azure.KeyVault;

    public static class KeyVaultClientExtension
    {
        public static async Task<X509Certificate2> GetX509CertificateAsync(this IKeyVaultClient kvClient, string vaultUrl,
            string certSecretName)
        {
            var bundle = await kvClient.GetSecretAsync(vaultUrl, certSecretName);
            byte[] bytes = Convert.FromBase64String(bundle.Value);
            X509Certificate2 x509 = new X509Certificate2(bytes);
            return x509;
        }
    }
}