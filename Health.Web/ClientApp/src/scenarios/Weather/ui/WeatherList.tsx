import * as React from "react";
import { WeatherForecast } from "../api/WeatherForecast";
import * as actionCreators from "~/scenarios/Weather/api/WeatherActionCreators";
import { RootState } from "~/store/RootReducer";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

export interface IWeatherListProps {
    weathers: WeatherForecast[];
    error?: Error;
    isLoading: boolean;
    actionCreators: typeof actionCreators;
}

class WeatherList extends React.Component<IWeatherListProps> {
    constructor(props: IWeatherListProps) {
        super(props);
    }

    public componentDidMount() {
        this.props.actionCreators.getWeatherForcasts();
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.props.weathers && this.props.weathers.map((weather, index) => {
                    return <div key={index}>{weather.date}</div>;
                })};
            </div>
        );
    }
}


function mapStateToProps(state: RootState): Partial<IWeatherListProps> {
    return {
        isLoading: state.weather.isLoading,
        error: state.weather.error,
        weathers: state.weather.weathers
    };
}

function mapDispatchToProps(dispatch: Dispatch): Partial<IWeatherListProps> {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);