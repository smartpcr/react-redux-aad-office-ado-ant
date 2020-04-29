import React, {CSSProperties} from "react";

import "./Logo.scss";
import className from "~/utils/classNames";

import LogoSvg from "~/assets/img/Health_Monitoring.svg";
import LogoLightSvg from "~/assets/img/logo-light.svg";

interface ILogoProps {
  alt?: string;
  light?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

const Logo: React.FunctionComponent<ILogoProps> = props => {
  const { light, style } = props;

  const logoClassNames = className({
    logo: true,
    [`${className}`]: props.className
  });

  const LogoSrc = light ? LogoLightSvg : LogoSvg;

  return (
    <div className={logoClassNames} style={style}>
      <div className="logo-wrap">
        <img className="logo-icon" src={LogoSrc} alt={props.alt} width={props.width} height={props.height} />
        <div className="logo-text">Data Center Health</div>
      </div>
    </div>
  )
};

Logo.defaultProps = {
  width: "auto",
  height: "auto",
  light: false,
  alt: ""
};

export default Logo;
