import { AppInsights } from "applicationinsights-js";
import { ScrubTools } from "./ScrubTools";
import { Config } from "~/config";
import { aad } from "~/aad/AuthProvider";

export enum MetricSeverityLevel {
    Verbose = 0,
    Information = 1,
    Warning = 2,
    Error = 3,
    Critical = 4
}

export module Metrics {
    export async function init(): Promise<void> {
        AppInsights.downloadAndSetup && AppInsights.downloadAndSetup({
            instrumentationKey: Config.getValue("UI:APPINSIGHTS_INSTRUMENTATION_KEY"),
            maxAjaxCallsPerView: -1
        });

        const user = await aad.getCurrentUser();
        if (user) {
            AppInsights.setAuthenticatedUserContext(ScrubTools.getHashString(user), undefined, true);
        }

        AppInsights.queue.push(() => {
            AppInsights.context.addTelemetryInitializer(envelope => {
                envelope.tags["ai.device.roleName"] = envelope.tags["ai.cloud.role"] = "PolCat-Web";
                maskPersonalInfo(envelope.data.baseData);
            });
        });

        let initResolved = false;

        return new Promise<void>(resolve => {
            AppInsights.queue.push(() => {
                setTimeout(() => {
                    if (!initResolved) {
                        initResolved = true;
                        resolve();
                    }
                }, 0);
            });

            setTimeout(() => {
                if (!initResolved) {
                    initResolved = true;
                    resolve();
                }
            }, 3000);           // plan B: allow the dependent code flow even if AppInsihgts failed to load
        });
    }

    export function trackPageView(pageName: string, values?: { [key: string]: unknown }) {
        const { props, measures } = convertToPropsAndMeasurements(values);
        AppInsights.trackPageView(pageName, undefined, props, measures);
    }

    export function trackTrace(message: string, severity: MetricSeverityLevel, values?: { [key: string]: unknown }) {
        const props = convertToProps(values);
        AppInsights.trackTrace(message, props, severity.valueOf());
    }

    export function trackEvent(name: string, values?: { [key: string]: unknown }) {
        const { props, measures } = convertToPropsAndMeasurements(values);
        AppInsights.trackEvent(name, props, measures);
    }

    export async function flush(): Promise<void> {
        AppInsights.flush();

        return new Promise<void>(resolve => {
            setTimeout(() => { resolve(); }, 500);      // give some time for all network request to be sent and not cancelled by the browser
        });
    }

    function convertToPropsAndMeasurements(values?: { [key: string]: unknown }) {
        let props: { [key: string]: string } | undefined = {};
        let measures: { [key: string]: number } | undefined = {};

        if (values) {
            // tslint:disable-next-line:no-for-in forin
            for (const key in values) {
                const value = values[key];
                if (typeof value === "number") {
                    measures[key] = value;
                } else if (value) {
                    addToProps(key, value, props);
                }
            }
        }

        if (Object.keys(props).length === 0) {
            props = undefined;
        }
        if (Object.keys(measures).length === 0) {
            measures = undefined;
        }

        return { props, measures };
    }

    function convertToProps(values?: { [key: string]: unknown }) {
        const props: { [key: string]: string } | undefined = {};
        if (values) {
            // tslint:disable-next-line:no-for-in forin
            for (const key in values) {
                const value = values[key];
                if (value) {
                    addToProps(key, value, props);
                }
            }
        }

        return props;
    }

    function addToProps(key: string, value: unknown, props: { [key: string]: string }) {
        if (value) {
            const strValue = `${value}`;
            props[key] = ScrubTools.maskEmail(strValue);
        }
    }

    type TelemetryBaseData = {
        url: string;
        properties: { [key: string]: string };
    };

    function maskPersonalInfo(telemetry: TelemetryBaseData) {
        if (telemetry.url) {
            telemetry.url = ScrubTools.maskEmail(telemetry.url);
        }
        // tslint:disable-next-line:no-for-in forin
        for (const key in telemetry.properties) {
            telemetry.properties[key] = ScrubTools.maskEmail(telemetry.properties[key]);
        }
    }
}
