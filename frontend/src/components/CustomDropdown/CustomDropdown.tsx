import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import Popper, { PopperProps } from "@material-ui/core/Popper";

// core components
import Button from '../CustomButtons/Button'

import { useStyles } from '../../assets/jss/material-kit-react/components/customDropdownStyle';
import { Color } from '../CustomButtons/Button';

type Props = {
  hoverColor: Color
  buttonText?: React.ReactNode,
  buttonIcon?: object | string,
  dropdownList?: React.ReactNode[],
  buttonProps?: object,
  dropup?: boolean,
  dropdownHeader?: React.ReactNode,
  rtlActive?: boolean,
  caret?: boolean,
  left?: boolean,
  noLiPadding?: boolean,
};

type colorHeader = 'warningHover' | 'successHover' | 'dangerHover' | 'infoHover' | 'primaryHover' | 'roseHover';


function convertColor(color: Color): colorHeader {
  switch (color) {
    case 'warning':
      return 'warningHover';
    case 'success':
      return 'successHover';
    case 'danger':
      return 'dangerHover';
    case 'info':
      return 'infoHover';
    case 'rose':
      return 'roseHover';
    default:
      return 'primaryHover'
  }
}

export const CustomDropdown: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null as PopperProps['anchorEl']);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (anchorEl && anchorEl.referenceNode == event.target) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (param: React.ReactNode) => {
    setAnchorEl(null);
  };
  const handleCloseAway = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorEl && anchorEl.referenceNode == event.target) {
      return;
    }
    setAnchorEl(null);
  };
  const classes = useStyles();
  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    left,
    rtlActive,
    noLiPadding,
  } = props;
  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretActive]: Boolean(anchorEl),
    [classes.caretRTL]: rtlActive,
  });
  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[convertColor(hoverColor)]]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
  });
  let icon = null;
  switch (typeof buttonIcon) {
    /**case "object":   //TODO: Fixing props.buttonIcon 
      icon = <props.buttonIcon className={classes.buttonIcon} />;
      break;*/
    case "string":
      icon = <Icon className={classes.buttonIcon}>{props.buttonIcon}</Icon>;
      break;
    default:
      icon = null;
      break;
  }
  return (
    <div>
      <div>
        <Button
          color="transparent"
          size="lg"
          href=""
          className=""
          aria-label="Notifications"
          aria-owns={anchorEl ? "menu-list" : null}
          aria-haspopup="true"
          {...buttonProps}
          onClick={handleClick}
        >
          {icon}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <b className={caretClasses} /> : null}
        </Button>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={
          dropup
            ? left
              ? "top-start"
              : "top"
            : left
              ? "bottom-start"
              : "bottom"
        }
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.popperResponsive]: true,
        })}
      >
        {() => (
          <Grow
            in={Boolean(anchorEl)}
            style={
              dropup
                ? { transformOrigin: "0 100% 0" }
                : { transformOrigin: "0 0 0" }
            }
          >
            <Paper className={classes.dropdown}>
              <ClickAwayListener onClickAway={handleCloseAway}>
                <MenuList role="menu" className={classes.menuList}>
                  {dropdownHeader !== undefined ? (
                    <MenuItem
                      onClick={() => handleClose(dropdownHeader)}
                      className={classes.dropdownHeader}
                    >
                      {dropdownHeader}
                    </MenuItem>
                  ) : null}
                  {dropdownList !== undefined ?
                    dropdownList.map((prop, key) => {
                      if (prop && prop.valueOf() === "divider") {
                        return (
                          <Divider
                            key={key}
                            onClick={() => handleClose("divider")}
                            className={classes.dropdownDividerItem}
                          />
                        );
                      }
                      return (
                        <MenuItem
                          key={key}
                          onClick={() => handleClose(prop)}
                          className={dropdownItem}
                        >
                          {prop}
                        </MenuItem>
                      );
                    }) : null
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default CustomDropdown;