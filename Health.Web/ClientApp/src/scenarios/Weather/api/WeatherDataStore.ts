import { WeatherForecast } from "./WeatherForecast";

export class WeatherDataStore {
    public isLoading: boolean;
    public weathers: WeatherForecast[];
    public error?: Error;
}

export const initialHeaderData: WeatherDataStore = {
    isLoading: false,
    weathers: []
};