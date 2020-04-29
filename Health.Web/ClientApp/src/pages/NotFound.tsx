import React from "react";

import "../BaseError/BaseErrorPage.scss";
import BaseError from "./BaseError";

const errorData = {
  title: "Oopps. The page you were looking for doesn't exist.",
  subTitle: "You may have mistyped the address or the page may have moved.",
  errorMessage: "404 Page not found"
};

const NotFound: React.FunctionComponent = () => <BaseError {...errorData} />;

export default NotFound;
