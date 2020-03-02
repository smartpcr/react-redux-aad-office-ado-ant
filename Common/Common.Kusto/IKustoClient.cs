using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Kusto
{
    public interface IKustoClient
    {
        Task<IEnumerable<T>> QueryAsync<T>(string functionName, params string[] parameters);
    }
}