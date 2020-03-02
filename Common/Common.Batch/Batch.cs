// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Batch.cs" company="Microsoft">
// </copyright>
// <summary>
//  The ElectricalDatacenterHealthService
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;

namespace Common.Batch
{
    public class Batch<T>
    {
        public T From { get; set; }
        public T To { get; set; }
        public int Sequence { get; set; }
        public string Consumer { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }
        public bool? Failed { get; set; }
        public string Error { get; set; }

        public Batch(T @from, T to, int seq)
        {
            From = @from;
            To = to;
            Sequence = seq;
            CreateTime = DateTime.UtcNow;
        }
    }
}