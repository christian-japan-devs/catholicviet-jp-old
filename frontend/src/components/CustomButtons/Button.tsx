import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import Button from "@material-ui/core/Button";
// core components
import { useStyles } from "../../assets/jss/material-kit-react/components/buttonStyle";

export type Color = 'warning' | 'success' | 'danger' | 'info' | 'primary' | "rose" | "white" | "transparent";

type Props = {
  color: Color,
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
  className: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

const RegularButton: React.FC<Props> = (props) => {
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
    onClick,
    ...rest
  } = props;

  const classes = useStyles();

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
    <Button onClick={onClick} target={target} href={href} className={btnClasses} {...rest} >
      {children}
    </Button>
  );
};

export default RegularButton;
