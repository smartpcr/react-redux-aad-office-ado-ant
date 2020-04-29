import { acquireToken } from "~/aad/AuthProvider";
import { Config } from "~/config";
import { HttpMethods } from "~/aad/MicrosoftGraph";

export class RestApi {
    private adToken!: string;
    private readonly apiHost!: string;
    private readonly resource!: string;
    public constructor(resource: string) {
        this.resource = resource;
        this.apiHost = Config.getValue("API_URL");
    }

    public async getAsync<T>(path?: string): Promise<T> {
        const request = await this.createRequest("GET", path);
        return this.executeRequest<T>(request);
    }

    public async post<T>(instance: T, path?: string): Promise<T> {
        const request = await this.createRequest("POST", path, instance);
        const response = await fetch(request);
        if (response.status >= 200 && response.status < 300) {
            const json = await response.json();
            return json;
        } else {
            throw new Error(
                `ErrorCode: ${response.status}, ErrorText: ${response.statusText}`
            );
        }
    }

    public async update<T>(instance: T, path?: string): Promise<void> {
        const request = await this.createRequest("PUT", path, instance);
        await this.executeRequest<T>(request);
    }

    public async deleteAsync<T>(path?: string): Promise<void> {
        const request = await this.createRequest("DELETE", path);
        const response = await fetch(request);
        if (response.status >= 300) {
            throw new Error(
                `ErrorCode: ${response.status}, ErrorText: ${response.statusText}`
            );
        }
    }

    public async fetch<T>(
        method: HttpMethods,
        path: string,
        body: any
    ): Promise<T> {
        const request = await this.createRequest(method, path, body);
        return this.executeRequest<T>(request);
    }

    private async createRequest(
        method: HttpMethods,
        path?: string,
        body?: any
    ): Promise<Request> {
        this.adToken = await acquireToken();
        const url = path
            ? `${this.apiHost}/${this.resource}${path}`
            : `${this.apiHost}/${this.resource}`;
        const request: Request = new Request(url, {
            method,
            headers: {
                Authorization: `Bearer ${this.adToken}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return request;
    }

    private async executeRequest<T>(request: Request): Promise<T> {
        const response = await fetch(request);
        if (response.status >= 200 && response.status < 300) {
            const json = await response.json();
            return json;
        } else {
            throw new Error(
                `ErrorCode: ${response.status}, ErrorText: ${response.statusText}`
            );
        }
    }
}

export class PagedResult<T> {
    public items: T[];
    public total: number;
}

export class PagingSetting {
    public total: number;
    public currentPage: number = 0;
    public pageSize: number = 10;
    public sortBy: string;
    public isDescending: boolean = false;
}
