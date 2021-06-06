import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridJustification } from "@material-ui/core/Grid";

const styles = {
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
};

const useStyles = makeStyles(styles);

type propTypes = {
  children: React.ReactNode,
  className?: string,
  justify?: GridJustification | undefined
};

export default function GridContainer(props: propTypes) {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

