import { Dispatch } from "redux";
import { weatherApi } from "./WeatherApi";
import * as Actions from "./WeatherActions";

export function getWeatherForcasts() {
    return async (dispatch: Dispatch) => {
        try {
            const weatherForcasts = await weatherApi.getAll();
            dispatch(Actions.getWeatherForecastsSuccess(weatherForcasts));
        } catch (error) {
            dispatch(Actions.getWeatherForecastsError(error));
        }
    };
}