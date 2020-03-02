// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IBatcher.cs" company="Microsoft">
// </copyright>
// <summary>
//  The ElectricalDatacenterHealthService
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Batch
{
    public interface IBatcher<T> where T : IComparable
    {
        Task GenerateBatchesIfNotExist();
        Task<int> GetTotalProcessed();
        Task<int> GetTotalInProgress();
        Task<int> GetTotalInQueue();
        Task<IEnumerable<Batch<T>>> Pickup(string consumer, int count = 1);
        Task Fail(Batch<T> batch);
        Task Succeed(Batch<T> batch);
    }
}