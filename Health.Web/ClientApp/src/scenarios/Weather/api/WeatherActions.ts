import { WeatherForecast } from "./WeatherForecast";
import { action } from "typesafe-actions";
import { WeatherActionTypes } from "./WeatherActionTypes";

export function getWeatherForecastsSuccess(weatherForecasts: WeatherForecast[]) {
    return action(WeatherActionTypes.GET_WEATHER_SUCCESS, weatherForecasts);
}

export function getWeatherForecastsError(error: Error) {
    return action(WeatherActionTypes.GET_WEATHER_ERROR, error);
}