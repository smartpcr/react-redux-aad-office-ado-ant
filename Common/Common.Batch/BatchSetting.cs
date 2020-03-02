using System;
using System.Collections.Generic;

namespace Common.Batch
{
    public class BatchSetting<T> where T : IComparable
    {
        public string Name { get; set; }
        public string SortField { get; set; }
        public long Total { get; set; }
        public int BatchSize { get; set; }
        public T Start { get; set; }
        public T End { get; set; }
        public int Concurrency { get; set; }
        public TimeSpan LeaseTimeout { get; set; }
    }

}