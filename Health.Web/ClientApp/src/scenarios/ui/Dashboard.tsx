import * as React from "react";
import Header from "~/scenarios/Header/Header";

export class Dashboard extends React.Component {
    public render(): JSX.Element {
        return (
            <div>
                <Header/>
                <h1>Dashboard</h1>
            </div>
        );
    }
}