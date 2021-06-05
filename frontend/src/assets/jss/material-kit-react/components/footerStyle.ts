import { container, primaryColor } from "../../material-kit-react.js";
//@material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

export const footerStyle = makeStyles((theme) => ({
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: 500,
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  center: {
    alignItems: "center",
  },
  left: {
    float: "left",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
  },
  footer: {
    marginBottom: "0px",
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: 2,
    bottom: "0px",
    position: "relative",
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  link: {
    "&,&:hover,&:focus": {
      color: "inherit",
      fontWeight: 300,
      fontSize: "14px",
      borderRadius: "3px",
      textDecoration: "none",
    }
  },
  footerNav: {
    textAlign: "center",
    fontWeight: 300,
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF",
    },
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px",
  },
}));
