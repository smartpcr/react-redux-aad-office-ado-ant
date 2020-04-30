import "./theme-selector.scss";
import React from "react";
import _ from "lodash";
import classNames from "classnames";
import {
    Card,
    CardBody,
    Button,
    FormGroup,
    CustomInput
} from "reactstrap";
import { Consumer } from "./ThemeContext";

export interface IStyleOption {
    name: string;
    value: string;
}

export class ChangeThemeArgs {
    public color?: string;
    public style?: string;
}

export interface IThemeSelectorProps {
    style: string;
    color: string;
    styleOptions?: IStyleOption[];
    styleDisabled?: boolean;
    colorOptions?: IStyleOption[];
    onChangeTheme?(args: ChangeThemeArgs): void;
}

export enum Styles {
    light = "light",
    dark = "dark",
    color = "color"
}

export enum Colors {
    primary = "primary",
    success = "success",
    info = "info",
    danger = "danger",
    purple = "purple",
    pink = "pink",
    warning = "warning",
    indigo = "indigo",
    yellow = "yellow"
}

export const defaultProps = (color: string, style: string, onChangeTheme?: (args: ChangeThemeArgs) => void): IThemeSelectorProps => {
    return {
        color: color,
        style: style,
        styleOptions: [
            { name: "Light", value: Styles.light },
            { name: "Dark", value: Styles.dark },
            { name: "Color", value: Styles.color }
        ],
        colorOptions: [
            { name: "Primary", value: Colors.primary },
            { name: "Success", value: Colors.success },
            { name: "Info", value: Colors.info },
            { name: "Danger", value: Colors.danger },
            { name: "Warning", value: Colors.warning },
            { name: "Indigo", value: Colors.indigo },
            { name: "Purple", value: Colors.purple },
            { name: "Pink", value: Colors.pink },
            { name: "Yellow", value: Colors.yellow }
        ],
        onChangeTheme: onChangeTheme
    };
};

export interface IThemeSelectorState {
    isActive: boolean;
    initialStyle: string;
    initialColor: string;
}

class ThemeSelector extends React.Component<IThemeSelectorProps, IThemeSelectorState> {
    constructor(props: IThemeSelectorProps) {
        super(props);

        this.state = {
            isActive: false,
            initialStyle: "",
            initialColor: ""
        };
    }

    public componentDidMount() {
        this.setState({
            initialColor: this.props.color,
            initialStyle: this.props.style
        });
    }

    public render() {
        const rootClass = classNames("theme-config", {
            "theme-config--active": this.state.isActive
        });

        return (
            <div className={rootClass}>
                <Button
                    color="primary"
                    className="theme-config__trigger"
                    onClick={() => { this.setState({ isActive: !this.state.isActive }); }}
                >
                    <i className="fa fa-paint-brush fa-fw" />
                </Button>
                <Card className="theme-config__body">
                    <CardBody>
                        <h6 className="text-center mb-3">
                            Configurator
                        </h6>

                        <FormGroup>
                            <span className="h6 small mb-2 d-block">
                                Nav Color
                            </span>
                            {
                                _.map(this.props.colorOptions, (option, index) => (
                                    <CustomInput
                                        key={index}
                                        type="radio"
                                        name="sidebarColor"
                                        id={`sidebarStyle--${option.value}`}
                                        value={option.value}
                                        checked={this.props.color === option.value}
                                        onChange={(ev) => {
                                            if (ev.target.checked) {
                                                this.props.onChangeTheme && this.props.onChangeTheme({
                                                    color: option.value
                                                });
                                            }
                                        }}
                                        label={(
                                            <span className="d-flex align-items-center">
                                                {option.name}
                                                <i className={`fa fa-circle ml-auto text-${option.value}`} />
                                            </span>
                                        )}
                                    />
                                ))
                            }
                        </FormGroup>
                        <FormGroup>
                            <span className="h6 small mb-2 d-block">
                                Nav Style
                            </span>
                            {
                                _.map(this.props.styleOptions, (option, index) => (
                                    <CustomInput
                                        key={index}
                                        type="radio"
                                        name="sidebarStyle"
                                        id={`sidebarStyle--${option.value}`}
                                        value={option.value}
                                        disabled={this.props.styleDisabled}
                                        checked={this.props.style === option.value}
                                        onChange={(ev) => {
                                            if (ev.target.checked) {
                                                this.props.onChangeTheme && this.props.onChangeTheme({
                                                    style: option.value
                                                });
                                            }
                                        }}
                                        label={option.name}
                                    />
                                ))
                            }
                        </FormGroup>
                        <FormGroup className="mb-0">
                            <Button
                                color="secondary"
                                outline={true}
                                className="d-block w-100"
                                onClick={() => {
                                    this.props.onChangeTheme && this.props.onChangeTheme({
                                        color: this.state.initialColor,
                                        style: this.state.initialStyle
                                    });
                                }}
                            >
                                Reset Options
                            </Button>
                        </FormGroup>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const ContextThemeSelector = (props: IThemeSelectorProps) =>
    <Consumer>
        {
            (themeState) => <ThemeSelector {...themeState} {...props} />
        }
    </Consumer>;

export { ContextThemeSelector as ThemeSelector };
