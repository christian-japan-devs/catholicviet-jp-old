import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
// core components
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import { headerLinksStyle } from '../../assets/jss/material-kit-react/components/headerLinksStyle';
import { Color } from '../CustomButtons/Button';

type Props = {
    isAuthenticated?: boolean,
    color: Color,
    handleLogout: () => void,
}
export const HeaderLinks: React.FC<Props> = (props) => {
    const classes = headerLinksStyle();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    hoverColor={props.color}
                    noLiPadding
                    buttonText='Thánh Lễ'
                    caret
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
                            <Link to='/lich/gio-le' className={classes.dropdownLink}>
                                Giờ Lễ
                            </Link>,
                            <Link to='/lich/gio-giai-toi' className={classes.dropdownLink}>
                                Giờ giải tội
                            </Link>
                        ]
                    }
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    hoverColor={props.color}
                    noLiPadding
                    buttonText='Phụng vụ'
                    caret
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
                            <Link to='/lich/lich-phung-vu' className={classes.dropdownLink}>
                                Lịch phụng vụ
                            </Link>
                        ]
                    }
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    hoverColor={props.color}
                    noLiPadding
                    buttonText='Liên lạc'
                    caret
                    buttonProps={{
                        className: classes.navLink,
                        color: 'transparent',
                    }}
                    dropdownList={
                        [
                            <Link to='/lien-lac/quy-cha' className={classes.dropdownLink}>
                                Quý Cha
                            </Link>,
                            <Link to='/lien-lac/hoi-doan' className={classes.dropdownLink}>
                                Hội đoàn
                            </Link>,
                            <Link to='/lien-lac/gioi-tre' className={classes.dropdownLink}>
                                Giới trẻ
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
                            <Link to='/account/profile' className={classes.navLink} style={{ textDecoration: 'none' }}>
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