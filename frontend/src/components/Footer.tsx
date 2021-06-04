import React from 'react';
//nodejs library that concatenates classes
import classNames from 'classnames';
//@material-ui/core components
import { Link } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core';
// @material-ui/icons

// core components
import { footerStyle } from '../assets/jss/material-kit-react/components/footerStyle';
import Copyright from './Copyright';

type propTypes = {
  whiteFont?: boolean,
}

const Footer: React.FC<propTypes> = (props: propTypes) => {
  const classes = footerStyle();

  React.useEffect(() => {
  });

  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <hr />
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link
                style={{ textDecoration: 'none' }}
                to="/gioi-thieu"
                className={classes.block}
              >
                About us
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link
                style={{ textDecoration: 'none' }}
                to="/lien-lac"
                className={classes.block}
              >
                Contact
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link
                style={{ textDecoration: 'none' }}
                to="https://facebook.com/"
                className={classes.block}
                target="_blank"
              >
                Facebook
            </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/ho-tro"
                className={classes.block}
                style={{ textDecoration: 'none' }}
                target="_blank"
              >
                Support us
            </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          <Copyright aClasses={aClasses} />
        </div>
      </div>
    </footer>
  )
}

export default Footer;