// Settings are stored in appconfig.json

export interface IFeatureFlags {
    GuardianStaticAnalysisEnabled: "true" | "false";
    OliveEnabled : "true" | "false";
    RepoCopEnabled : "true" | "false";
}

export module Config {
    export function getValue<T = string>(key: string): T {
        // tslint:disable-next-line:no-string-literal
        const cfg = global["config"] || {};

        return cfg[key];
    }

    export const featureFlags = getValue<IFeatureFlags>("UI:FEATURE_FLAGS");
}
