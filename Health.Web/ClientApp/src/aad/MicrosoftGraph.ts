import { acquireGraphToken } from "~/aad/AuthProvider";

export interface IGraphUser {
    businessPhones: string[];
    displayName: string;
    givenName: string;
    jobTitle: string;
    mail: string;
    mobilePhone: string;
    officeLocation: string;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
    id: string;
}

export type HttpMethods =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE";

/**
 * Makes an authenticated request to the Microsoft Graph API
 * @param url relative url from apiHost
 * @param method HTTP method
 */
export async function makeRequest(
    url: string,
    method: HttpMethods
): Promise<Response> {
    try {
        const graphToken: string = await acquireGraphToken();
        const apiHost = "https://graph.microsoft.com/v1.0";
        const request: Request = new Request(`${apiHost}${url}`, {
            method,
            headers: {
                Authorization: `Bearer ${graphToken}`,
                "content-type": "application.json"
            }
        });
        return fetch(request);
    } catch (err) {
        throw err;
    }
}

/**
 * @returns information about the logged in user
 */
export async function me(): Promise<IGraphUser> {
    try {
        const response: Response = await makeRequest("/me", "GET");
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(
                `ErrorCode: ${response.status}, ErrorText: ${response.status}`
            );
        }
    } catch (err) {
        throw err;
    }
}

/**
 * NOTE: Wrap the binary data with URL.createObjectURL to pass into <img/> tags and such
 * @returns the binary photo for the logged in user
 */
export async function mePhoto(): Promise<Blob> {
    try {
        const response: Response = await makeRequest("/me/photo/$value", "GET");
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error(
                `ErrorCode: ${response.status}, ErrorText: ${response.status}`
            );
        }
    } catch (err) {
        throw err;
    }
}
