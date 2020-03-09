import "./index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { runWithAdal } from "react-adal";
import { aad } from "~/aad/AuthProvider";

runWithAdal(aad.authContext, () => {
    ReactDOM.render(
        (
            <div>
                <span>Hello World</span>
            </div>
        ),
        document.getElementById("root"));
}, false);
