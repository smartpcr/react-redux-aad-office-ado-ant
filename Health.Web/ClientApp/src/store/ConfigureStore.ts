import { applyMiddleware, createStore, Store, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Config } from "../config";
import { actionTracerMiddleware } from "~/metrics/ActionTraceMiddleware";
import { rootReducers } from "./RootReducer";

export default function configureStore(): Store {
    let middleware;
    if (Config.getValue("REDUX_DEVTOOLS") === "True") {
        middleware = composeWithDevTools(applyMiddleware(thunk, actionTracerMiddleware));
    } else {
        middleware = applyMiddleware(thunk, actionTracerMiddleware);
    }

    return createStore(
        rootReducers,
        compose(middleware)
    );
}
