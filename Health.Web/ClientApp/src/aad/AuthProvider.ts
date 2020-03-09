import {
    AuthenticationContext,
    adalFetch,
    withAdalLogin,
    AdalConfig
} from "react-adal";
import { Config } from "~/config";

export module aad {

    export const adalConfig: AdalConfig = {
        tenant:
            Config.getValue("AadSettings:TenantId") ||
            "72f988bf-86f1-41af-91ab-2d7cd011db47",
        clientId:
            Config.getValue("AadSettings:ClientId") ||
            "87e94073-6809-4746-b283-4d266aea8510",
        endpoints: {
            api:
                Config.getValue("AadSettings:ClientId") ||
                "87e94073-6809-4746-b283-4d266aea8510"
        },
        cacheLocation: "localStorage"
    };

    export const adResourceId =
        Config.getValue("UI:AD_RESOURCE_ID") ||
        "87e94073-6809-4746-b283-4d266aea8510";
    export const graphResourceId =
        Config.getValue("UI:GRAPH_RESOURCE_ID") ||
        "00000003-0000-0000-c000-000000000000";
    export const authContext = new AuthenticationContext(adalConfig);

    export const adalApiFetch = (
        // tslint:disable-next-line: no-any
        fetch: (input: string, init: any) => Promise<any>,
        url: string,
        // tslint:disable-next-line: no-any
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

    export async function getCurrentUser(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            authContext.getUser((error, user) => {
                if (error || !user) {
                    if (error === "User login is required") {
                        authContext.login();
                    }
                    reject(error || "No token found");
                    return;
                }
                resolve(user.userName);
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

}
