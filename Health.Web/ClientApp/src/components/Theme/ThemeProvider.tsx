import React from "react";
import { Provider } from "./ThemeContext";

export interface IThemeProviderProps {
    initialStyle: string;
    initialColor: string;
    children: any;
}

export class ThemeProvider extends React.Component<IThemeProviderProps> {
    constructor(props: IThemeProviderProps) {
        super(props);

        this.state = {
            style: "light",
            color: "primary"
        };
    }

    public componentDidMount() {
        const { initialStyle, initialColor } = this.props;

        if (initialStyle) {
            this.setState({ style: initialStyle });
        }
        if (initialColor) {
            this.setState({ color: initialColor });
        }
    }

    public onChangeTheme(themeState: string): void {
        this.setState(themeState);
    }

    public render(): JSX.Element {
        const { children } = this.props;

        return (
            <Provider
                value={{
                    ...this.state,
                    onChangeTheme: this.onChangeTheme.bind(this)
                }}
            >
                {children}
            </Provider>
        );
    }
}
