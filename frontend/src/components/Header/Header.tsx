import React from 'react';
//nodejs library that concatenates classes
import classNames from 'classnames';
import { Link } from 'react-router-dom';
//@material-ui/core components
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
//@material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import { headerStyle } from '../../assets/jss/material-kit-react/components/headerStyle';



type propTypes = {
    color: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'transparent' | 'white' | 'rose' | 'dark',
    rightLinks?: React.ReactNode,
    leftLinks?: React.ReactNode,
    brand: string,
    fixed?: boolean,
    absolute?: boolean,
    // this will cause the sidebar to change the color from
    // props.color (see above) to changeColorOnScroll.color
    // when the window.pageYOffset is heigher or equal to
    // changeColorOnScroll.height and then when it is smaller than
    // changeColorOnScroll.height change it back to
    // props.color (see above)
    changeColorOnScroll: {
        height: number,
        color: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'transparent' | 'white' | 'rose' | 'dark'
    }
}

const Header: React.FC<propTypes> = (props: propTypes) => {
    const classes = headerStyle();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.changeColorOnScroll) {
            window.addEventListener("scroll", headerColorChange);
        }
        return function cleanup() {
            if (props.changeColorOnScroll) {
                window.removeEventListener("scroll", headerColorChange);
            }
        }
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }
    const headerColorChange = () => {
        const { color, changeColorOnScroll } = props;
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            document.body
                .getElementsByTagName('header')[0]
                .classList.remove(classes[color]);
            document.body
                .getElementsByTagName('header')[0]
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.body
                .getElementsByTagName('header')[0]
                .classList.remove(classes[changeColorOnScroll.color]);
            document.body
                .getElementsByTagName('header')[0]
                .classList.add(classes[color]);
        }
    }

    const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed,
    });
    const brandComponent = <Button className={classes.title}><Link to='/' className={classes.title} style={{ textDecoration: 'none', fontWeight: 450 }}>{brand}</Link></Button>
    return (
        <Container maxWidth='lg'>
            <AppBar className={appBarClasses}>
                <Toolbar className={classes.container}>
                    {leftLinks !== undefined ? brandComponent : null}
                    <div className={classes.flex}>
                        {leftLinks !== undefined ? (
                            <Hidden smDown implementation='css'>
                                {leftLinks}
                            </Hidden>
                        ) : (
                            brandComponent
                        )}
                    </div>
                    <Hidden smDown implementation='css'>
                        {rightLinks}
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            color='secondary'
                            arial-label='Menu'
                            onClick={handleDrawerToggle}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
                <Hidden mdUp implementation='js'>
                    <Drawer
                        variant="temporary"
                        anchor={"right"}
                        open={mobileOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        onClose={handleDrawerToggle}
                    >
                        <div className={classes.appResponsive}>
                            {leftLinks !== undefined ? leftLinks : brandComponent}
                            {rightLinks}
                        </div>
                    </Drawer>
                </Hidden>
            </AppBar>
        </Container>
    )
}

export default Header;