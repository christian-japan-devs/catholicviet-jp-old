import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridSize } from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  grid: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
    flexBasis: "auto",
  },
}));

type propTypes = {
  children: React.ReactNode,
  className?: string,
  component?: string,
  xs?: boolean | GridSize | undefined,
  sm?: boolean | GridSize | undefined,
};

export default function GridItem(props: propTypes) {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}
