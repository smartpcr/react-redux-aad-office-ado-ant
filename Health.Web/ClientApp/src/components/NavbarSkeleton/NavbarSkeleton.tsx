import "./NavbarSkeleton.scss";
import React from "react";
import className from "~/utils/classNames";

interface INavbarSkeletonProps {
  type: "horizontal" | "vertical";
  loaded: boolean;
  showLogo?: boolean;
}

const NavbarSkeleton: React.FunctionComponent<INavbarSkeletonProps> = props => {
  const skeletonClasses = className({
    "navbar-skeleton": true,
    invisible: props.loaded,
    vertical: props.type === "vertical"
  });

  return (
    <div className={skeletonClasses}>
      {props.type === "horizontal" && (
        <React.Fragment>
          <div className="left-part d-flex align-items-center">
            <span className="animated-bg d-block d-lg-none navbar-button" />
            {props.showLogo && <span className="animated-bg bg-1 d-none d-lg-block sk-logo" />}
            <span className="animated-bg bg-4 search d-none d-md-block" />
          </div>

          <div className="right-part d-flex align-items-center">
            <div className="icon-box">
              <span className="icon bg-4 animated-bg" />
              <span className="badge" />
            </div>
            <span className="avatar bg-4 animated-bg" />
          </div>
        </React.Fragment>
      )}

      {props.type === "vertical" && (
        <React.Fragment>
          <div className="top-part">
            <div className="logo-block">
              <div className="sk-logo bg-1 animated-bg" />
            </div>

            <div className="sk-menu">
              <div className="sk-button bg-2 animated-bg" />
              <span className="sk-menu-item bg animated-bg w-75" />
              <span className="sk-menu-item bg animated-bg w-60" />
              <span className="sk-menu-item bg animated-bg w-50" />
            </div>

            <div className="sk-menu">
              <div className="sk-group-item bg-3 animated-bg w-80 mb-4" />
              <span className="sk-menu-item bg animated-bg w-75" />
              <span className="sk-menu-item bg animated-bg w-50" />
              <span className="sk-menu-item bg animated-bg w-75" />
              <span className="sk-menu-item bg animated-bg w-75" />
              <span className="sk-menu-item bg animated-bg w-50" />
              <span className="sk-menu-item bg animated-bg w-50" />
              <span className="sk-menu-item bg animated-bg w-50" />
              <span className="sk-menu-item bg animated-bg w-50" />
            </div>

            <div className="sk-menu">
              <div className="sk-group-item bg-3 animated-bg w-60 my-4" />
              <span className="sk-menu-item bg animated-bg" />
              <span className="sk-menu-item bg animated-bg w-75" />
              <span className="sk-menu-item bg animated-bg w-75" />
              <span className="sk-menu-item bg animated-bg " />
            </div>
          </div>

          <div className="horizontal-menu">
            <span className="sk-menu-item bg animated-bg" />
            <span className="sk-menu-item bg animated-bg" />
            <span className="sk-menu-item bg animated-bg" />
            <span className="sk-menu-item bg animated-bg" />
            <span className="sk-menu-item bg animated-bg" />
            <span className="sk-menu-item bg animated-bg" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

NavbarSkeleton.defaultProps = {
  loaded: false,
  type: "horizontal",
  showLogo: false
};

export default NavbarSkeleton;
