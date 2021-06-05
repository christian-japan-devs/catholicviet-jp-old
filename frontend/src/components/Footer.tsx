import React from 'react';
import { Link } from 'react-router-dom';
//nodejs library that concatenates classes
import classNames from 'classnames';
//@material-ui/core components
import { List, ListItem } from '@material-ui/core';
// @material-ui/icons

// core components
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
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
        <GridContainer className={classes.footerNav}>
          <GridItem xs={12} sm={3}>
            <List>
              <ListItem>
                <h5 style={{ color: '#232323' }}>CatholicViet.Jp</h5>
              </ListItem>
              <ListItem>
                <p>
                  Cổng thông tin chính thức của người công giáo Việt Nam tại Nhật bản.
              </p>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={3}>
            <List >
              <ListItem>
                <h5 style={{ fontWeight: 400 }}>Thánh Lễ</h5>
              </ListItem>
              <ListItem><Link
                style={{ textDecoration: 'none' }}
                to="/thanh-le/nha-tho"
                className={classes.link}
              >
                Nhà Thờ
                </Link></ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/lich/gio-le"
                  className={classes.link}
                >
                  Giờ Lễ
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/lich/gio-giai-toi"
                  className={classes.link}
                >
                  Giờ giải tội
                </Link>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={3}>
            <List >
              <ListItem>
                <h5 style={{ fontWeight: 400 }}>Phụng vụ</h5>
              </ListItem>
              <ListItem><Link
                style={{ textDecoration: 'none' }}
                to="/phung-vu/tin-mung"
                className={classes.link}
              >
                Tin Mừng
                </Link></ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/phung-vu/giao-ly"
                  className={classes.link}
                >
                  Giáo lý
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/phung-vu/nghi-thuc"
                  className={classes.link}
                >
                  Các nghi thức
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/lich/lich-phung-vu"
                  className={classes.link}
                >
                  Lịch phụng vụ
                </Link>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={3}>
            <List >
              <ListItem>
                <h5 style={{ fontWeight: 400 }}>Liên lạc</h5>
              </ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/lien-lac/quy-cha"
                  className={classes.link}
                >
                  Quý Cha
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/lien-lac/dong-tu"
                  className={classes.link}
                >
                  Dòng Tu
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/lien-lac/hoi-doan"
                  className={classes.link}
                >
                  Hội đoàn
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/lien-lac/gioi-tre"
                  className={classes.link}
                >
                  Giới trẻ
                </Link>
              </ListItem>
            </List>
          </GridItem>
        </GridContainer>
        <hr style={{ border: '0.5px solid' }} />
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link
                style={{ textDecoration: 'none' }}
                to="/gioi-thieu/dev"
                className={classes.block}
              >
                About us
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link
                style={{ textDecoration: 'none' }}
                to="/lien-lac/dev"
                className={classes.block}
              >
                Contact
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/ho-tro/dev"
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