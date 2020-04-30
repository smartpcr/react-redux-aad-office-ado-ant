import "./index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { runWithAdal } from "react-adal";
import { authContext } from "~/aad/AuthProvider";
import { initializeIcons } from "office-ui-fabric-react";
import { trackPageView, initAppInsights } from "./metrics";
import configureStore from "./store/ConfigureStore";
import { Provider } from "react-redux";
import { Dashboard } from "./scenarios/Dashboard/Dashboard";
import VerticalLayout from "./layouts/Vertical/VerticalLayout";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "~/store/RootReducer";

const store = configureStore();
initAppInsights();
initializeIcons();


runWithAdal(authContext, () => {
    if (authContext.isCallback(window.location.hash)) {
        authContext.handleWindowCallback(window.location.hash);
    }

    ReactDOM.render(
        (
            <div>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Route path="/" component={VerticalLayout} onEnter={() => trackPageView("VerticalLayout")} />
                        <Route path="/dashboard" component={Dashboard} onEnter={() => trackPageView("Dashboard")} />
                    </ConnectedRouter>
                </Provider>
            </div>
        ),
        document.getElementById("root"));
}, false);
