using System;
using System.Diagnostics.Tracing;
using Common.Telemetry.RuntimeTelemetry.EventSources;
using Common.Telemetry.RuntimeTelemetry.Util;
using Microsoft.ApplicationInsights;

namespace Common.Telemetry.RuntimeTelemetry.Collectors
{
    /// <summary>
    /// Measures the level of contention in a .NET process, capturing the number
    /// of locks contended and the total amount of time spent contending a lock.
    /// </summary>
    /// <remarks>
    /// Due to the way ETW events are triggered, only monitors contended will fire an event- spin locks, etc.
    /// do not trigger contention events and so cannot be tracked.
    /// </remarks>
    internal sealed class ContentionStatsCollector : IEventSourceStatsCollector
    {
        private const int EventIdContentionStart = 81, EventIdContentionStop = 91;
        private readonly EventPairTimer<long> _eventPairTimer = new EventPairTimer<long>(EventIdContentionStart, EventIdContentionStop, x => x.OSThreadId);

        public EventKeywords Keywords => (EventKeywords)DotNetRuntimeEventSource.Keywords.Contention;
        public EventLevel Level => EventLevel.Informational;
        public Guid EventSourceGuid => DotNetRuntimeEventSource.Id;

        internal Metric ContentionSecondsTotal { get; private set; }
        internal Metric ContentionTotal { get; private set; }

        public void RegisterMetrics(TelemetryClient telemetry)
        {
            ContentionSecondsTotal = telemetry.GetMetric("dotnet_contention_seconds_total");
            ContentionTotal = telemetry.GetMetric("dotnet_contention_total");
        }

        public void UpdateMetrics()
        {
        }

        public void ProcessEvent(EventWrittenEventArgs e)
        {
            if (_eventPairTimer.TryGetEventPairDuration(e, out var duration))
            {
                ContentionTotal.TrackValue(1);
                ContentionSecondsTotal.TrackValue(duration.TotalSeconds);
            }
        }
    }
}