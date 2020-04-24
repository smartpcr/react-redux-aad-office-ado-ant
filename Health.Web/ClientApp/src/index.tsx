import "./index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { runWithAdal } from "react-adal";
import { authContext } from "~/aad/AuthProvider";
import { initializeIcons } from "office-ui-fabric-react";
import { trackPageView, initAppInsights } from "./metrics";
import configureStore from "./store/ConfigureStore";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory, Route, Router } from "react-router";
import { Provider } from "react-redux";
import { Dashboard } from "./scenarios/ui/Dashboard";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
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
                    <Router history={history}>
                        <Route path="/" component={Dashboard} onEnter={() => trackPageView("Dashboard")} />
                    </Router>
                </Provider>
            </div>
        ),
        document.getElementById("root"));
}, false);
