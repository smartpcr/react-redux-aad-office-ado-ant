// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Batch.cs" company="Microsoft">
// </copyright>
// <summary>
//  The ElectricalDatacenterHealthService
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace Common.Batch
{
    public interface IRangeHelper<T> where T : IComparable
    {
        IList<(T start, T end)> Split(T start, T end, int size);
    }

    public class TimeRangeHelper : IRangeHelper<DateTime>
    {
        public IList<(DateTime start, DateTime end)> Split(DateTime start, DateTime end, int size)
        {
            var output = new List<(DateTime start, DateTime end)>();
            var span = (end - start) / size;
            var current = start;
            while (current <= end)
            {
                output.Add((current, current + span));
                current += span;
            }

            return output;
        }
    }
}