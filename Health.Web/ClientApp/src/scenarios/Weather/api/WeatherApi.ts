import { WeatherForecast } from "./WeatherForecast";
import { RestApi } from "~/shared/RestApi";

export module weatherApi {
    const apiResources: string = "weatherforecast";

    export async function getAll(): Promise<WeatherForecast[]> {
        try {
            const api = new RestApi(apiResources);
            const resp = await api.getAsync<WeatherForecast[]>();
            return resp;
        } catch (err) {
            throw new Error(`API error: failed to get weather forecasts: ${err}`);
        }
    }
}