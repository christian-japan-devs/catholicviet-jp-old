import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import Button from "@material-ui/core/Button";

// core components

import { buttonStyle } from "../../assets/jss/material-kit-react/components/buttonStyle";

type propTypes = {
  color:
  "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "rose"
  | "white"
  | "facebook"
  | "twitter"
  | "google"
  | "github"
  | "transparent",
  size: "sm" | "lg",
  simple?: boolean,
  round?: boolean,
  fullWidth?: boolean,
  disabled?: boolean,
  block?: boolean,
  link?: boolean,
  justIcon?: boolean,
  href: string,
  target?: string,
  children: React.ReactNode,
  className: string

};

const RegularButton: React.FC<propTypes> = ((props: propTypes) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    href,
    target,
    ...rest
  } = props;

  const classes = buttonStyle();

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <Button target={target} href={href} className={btnClasses} {...rest} >
      {children}
    </Button>
  );
});

export default RegularButton;
