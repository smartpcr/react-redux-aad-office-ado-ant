import * as appConfig from "./config.json";
import * as devConfig from "./config.Development.json";

export module Config {
    const loadConfig = (): any => {
        let settings = appConfig["default"];
        if (process.env.NODE_ENV === "development") {
            settings = { ...settings, ...devConfig };
        }
        return settings;
    };

    export function getValue<T = string>(key: string): T {
        // tslint:disable-next-line:no-string-literal
        const cfg = loadConfig();
        return cfg[key];
    }
}