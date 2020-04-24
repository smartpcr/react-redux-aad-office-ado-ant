import {
    AuthenticationContext,
    adalFetch,
    withAdalLogin,
    AdalConfig
} from "react-adal";
import { Config } from "~/config";

export const adalConfig: AdalConfig = {
    tenant: Config.getValue("AD_TENANT_ID"),
    clientId: Config.getValue("AD_CLIENT_ID"),
    endpoints: {
        api: Config.getValue("AD_CLIENT_ID")
    },
    cacheLocation: "localStorage"
};

export const adResourceId = Config.getValue("AD_RESOURCE_ID");
export const graphResourceId = Config.getValue("GRAPH_RESOURCE_ID");
export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (
    fetch: (input: string, init: any) => Promise<any>,
    url: string,
    options: any
) =>
    adalFetch(
        authContext,
        adalConfig.endpoints ? adalConfig.endpoints.api : "",
        fetch,
        url,
        options
    );

export const withAdalLoginApi = withAdalLogin(
    authContext,
    adalConfig.endpoints ? adalConfig.endpoints.api : ""
);

export async function acquireToken(): Promise<string> {
    return acquireTokenForResource(adResourceId);
}

export async function acquireGraphToken(): Promise<string> {
    return acquireTokenForResource(graphResourceId);
}

export async function getCurrentUsername(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        authContext.getUser((error, userInfo) => {
            if (error || !userInfo) {
                if (error === "User login is required") {
                    authContext.login();
                }
                reject(error || "No token found");
                return;
            }
            resolve(userInfo.userName);
        });
    });
}

async function acquireTokenForResource(resourceId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        authContext.acquireToken(resourceId, (error, token) => {
            if (error || !token) {
                if (error === "User login is required") {
                    authContext.login();
                }
                reject(error || "No token found");
                return;
            }
            resolve(token);
        });
    });
}