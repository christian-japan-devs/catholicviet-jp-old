import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
//@material-ui/icons

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";

import { headerLinksStyle } from '../../assets/jss/material-kit-react/components/headerLinksStyle';

type propTypes = {
    isAuthenticated?: boolean,
    handleLogout: () => void;
}
const HeaderLinks: React.FC<propTypes> = (props: propTypes) => {
    const classes = headerLinksStyle();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText='Thánh Lễ'
                    buttonProps={{
                        className: classes.navLink,
                        color: 'transparent',
                    }}
                    dropdownList={
                        [
                            <Link to='/thanh-le/dang-ky' className={classes.dropdownLink}>
                                Đăng ký
                            </Link>,
                            <Link to='/thanh-le/nha-tho' className={classes.dropdownLink}>
                                Nhà thờ
                            </Link>,
                            <Link to='/thanh-le/gio-le' className={classes.dropdownLink}>
                                Giờ Lễ
                            </Link>,
                            <Link to='/thanh-le/giai-toi' className={classes.dropdownLink}>
                                Giờ giải tội
                            </Link>
                        ]
                    }
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText='Phụng vụ'
                    buttonProps={{
                        className: classes.navLink,
                        color: 'transparent',
                    }}
                    dropdownList={
                        [
                            <Link to='/phung-vu/tin-mung' className={classes.dropdownLink}>
                                Tin Mừng
                            </Link>,
                            <Link to='/phung-vu/giao-ly' className={classes.dropdownLink}>
                                Giáo lý
                            </Link>,
                            <Link to='/phung-vu/nghi-thuc' className={classes.dropdownLink}>
                                Các nghi thức
                            </Link>,
                            <Link to='/phung-vu/bao-phung-vu' className={classes.dropdownLink}>
                                Báo phụng vụ
                            </Link>
                        ]
                    }
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText='Liên lạc'
                    buttonProps={{
                        className: classes.navLink,
                        color: 'transparent',
                    }}
                    dropdownList={
                        [
                            <Link to='/lien-lac/quy-cha' className={classes.dropdownLink}>
                                Quý Cha
                            </Link>,
                            <Link to='/lien-lac/giao-doan' className={classes.dropdownLink}>
                                Hội đoàn
                            </Link>,
                            <Link to='/lien-lac/giao-doan' className={classes.dropdownLink}>
                                Giáo đoàn
                            </Link>
                        ]
                    }
                />
            </ListItem>
            { props.isAuthenticated ?
                <>
                    <ListItem className={classes.listItem}>
                        <Tooltip
                            id='login'
                            title='Thông tin cá nhân'
                            placement={window.innerWidth > 959 ? "top" : "left"}
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <Link to='/login' className={classes.navLink} style={{ textDecoration: 'none' }}>
                                Cá nhân
                        </Link>
                        </Tooltip>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Link to='/' className={classes.navLink} style={{ textDecoration: 'none' }} onClick={props.handleLogout}>
                            Đăng xuất
                        </Link>
                    </ListItem>
                </>
                :
                <ListItem className={classes.listItem}>
                    <Link to='/login' className={classes.navLink} style={{ textDecoration: 'none' }}>
                        Đăng nhập
                    </Link>
                </ListItem>
            }
        </List>
    );
}

export default HeaderLinks;