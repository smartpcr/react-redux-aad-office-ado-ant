using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Storage.Blobs;
using Common.Auth;
using Common.Config;
using Common.KeyVault;
using Microsoft.Azure.KeyVault;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Common.Blob
{
    using Microsoft.Azure.Services.AppAuthentication;

    internal class BlobContainerFactory
    {
        private readonly BlobStorageSettings blobSettings;
        private readonly AadSettings aadSettings;
        private readonly VaultSettings vaultSettings;
        private readonly ILogger<BlobContainerFactory> logger;
        public BlobContainerClient Client { get; private set; }

        public BlobContainerFactory(IConfiguration configuration, ILoggerFactory loggerFactory)
        {
            blobSettings = configuration.GetConfiguredSettings<BlobStorageSettings>();
            aadSettings = configuration.GetConfiguredSettings<AadSettings>();
            vaultSettings = configuration.GetConfiguredSettings<VaultSettings>();
            logger = loggerFactory.CreateLogger<BlobContainerFactory>();

            if (!TryCreateUsingMsi())
            {
                if (!TryCreateUsingSpn())
                {
                    if (!TryCreateFromKeyVault())
                    {
                        TryCreateUsingConnStr();
                    }
                }
            }
        }

        /// <summary>
        /// running app/svc/pod/vm is assigned an identity (user-assigned, system-assigned)
        /// </summary>
        /// <returns></returns>
        private bool TryCreateUsingMsi()
        {
            logger.LogInformation($"trying to access blob using msi...");
            try
            {
                var containerClient = new BlobContainerClient(new Uri(blobSettings.ContainerEndpoint), new DefaultAzureCredential());
                containerClient.CreateIfNotExists();

                TryRecreateTestBlob(containerClient);
                logger.LogInformation($"Succeed to access blob using msi");
                Client = containerClient;
                return true;
            }
            catch (Exception ex)
            {
                logger.LogWarning($"failed to access blob {blobSettings.Account}/{blobSettings.Container} using msi\nerror: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// using pre-configured spn to access storage, secret must be provided for spn authentication
        /// </summary>
        /// <returns></returns>
        private bool TryCreateUsingSpn()
        {
            logger.LogInformation($"trying to access blob using spn...");
            try
            {
                var authBuilder = new AadTokenProvider(aadSettings);
                var clientCredential = authBuilder.GetClientCredential();
                BlobContainerClient containerClient;
                if (clientCredential.secretCredential != null)
                {
                    containerClient = new BlobContainerClient(new Uri(blobSettings.ContainerEndpoint), clientCredential.secretCredential);
                }
                else
                {
                    containerClient = new BlobContainerClient(new Uri(blobSettings.ContainerEndpoint), clientCredential.certCredential);
                }

                TryRecreateTestBlob(containerClient);
                logger.LogInformation($"Succeed to access blob using msi");
                Client = containerClient;
                return true;
            }
            catch (Exception ex)
            {
                logger.LogWarning($"faield to access blob using spn.\nerror:{ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// using pre-configured spn to access key vault, then retrieve sas/conn string for storage
        /// </summary>
        /// <returns></returns>
        private bool TryCreateFromKeyVault()
        {
            if (!string.IsNullOrEmpty(blobSettings.ConnectionStringSecretName))
            {
                logger.LogInformation($"trying to access blob from kv...");
                try
                {
                    IKeyVaultClient kvClient;
                    if (string.IsNullOrEmpty(aadSettings.ClientCertFile) && string.IsNullOrEmpty(aadSettings.ClientSecretFile))
                    {
                        var azureServiceTokenProvider = new AzureServiceTokenProvider();
                        kvClient = new KeyVaultClient(
                            new KeyVaultClient.AuthenticationCallback(
                                azureServiceTokenProvider.KeyVaultTokenCallback));
                    }
                    else
                    {
                        var authBuilder = new AadTokenProvider(aadSettings);
                        Task<string> AuthCallback(string authority, string resource, string scope) => authBuilder.GetAccessTokenAsync(resource);
                        kvClient = new KeyVaultClient(AuthCallback);
                    }

                    var connStrSecret = kvClient
                        .GetSecretAsync(vaultSettings.VaultUrl, blobSettings.ConnectionStringSecretName).Result;
                    var containerClient = new BlobContainerClient(connStrSecret.Value, blobSettings.Container);
                    containerClient.CreateIfNotExists();

                    TryRecreateTestBlob(containerClient);
                    logger.LogInformation($"Succeed to access blob using msi");
                    Client = containerClient;
                    return true;
                }
                catch (Exception ex)
                {
                    logger.LogWarning($"faield to access blob from kv. \nerror:{ex.Message}");
                    return false;
                }
            }

            return false;
        }

        /// <summary>
        /// connection string is provided as env variable (most unsecure)
        /// </summary>
        /// <returns></returns>
        private bool TryCreateUsingConnStr()
        {
            if (!string.IsNullOrEmpty(blobSettings.ConnectionStringEnvName))
            {
                logger.LogInformation($"trying to access blob using connection string...");
                try
                {
                    var storageConnectionString =
                        Environment.GetEnvironmentVariable(blobSettings.ConnectionStringEnvName);
                    if (!string.IsNullOrEmpty(storageConnectionString))
                    {
                        var containerClient = new BlobContainerClient(storageConnectionString, blobSettings.Container);
                        containerClient.CreateIfNotExists();
                        TryRecreateTestBlob(containerClient);
                        Client = containerClient;
                        return true;
                    }

                    return false;
                }
                catch (Exception ex)
                {
                    logger.LogWarning($"trying to access blob using connection string. \nerror{ex.Message}");
                    return false;
                }
            }

            return false;
        }

        private void TryRecreateTestBlob(BlobContainerClient containerClient)
        {
            var isContainerExists = containerClient.Exists();
            if (!isContainerExists.Value)
            {
                throw new Exception("Blob container is either not created or authn/authz failed");
            }
        }
    }
}
