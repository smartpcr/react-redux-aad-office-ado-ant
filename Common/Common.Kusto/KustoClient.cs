// --------------------------------------------------------------------------------------------------------------------
// <copyright file="KustoClient.cs" company="Microsoft">
// </copyright>
// <summary>
//  The ElectricalDatacenterHealthService
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Kusto
{
    public class KustoClient : IKustoClient
    {
        public Task<IEnumerable<T>> QueryAsync<T>(string functionName, params string[] parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}