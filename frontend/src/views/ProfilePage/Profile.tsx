import React from 'react';
//NOdejs library that concatenates classes
import classNames from 'classnames';
// @materia-ui/core
import Divider from '@material-ui/core/Divider'
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from '@material-ui/icons/Build';
//Share components
import Layout from '../Layout';
import Paralax from '../../components/Parallax/Parallax';
import { GridContainer } from '../../components/Grid/GridContainer';
import { GridItem } from '../../components/Grid/GridItem';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import { useStyles } from '../../assets/jss/material-kit-react/views/profilePage';
//Tabs
import { PersonalInforTab } from './PersonalInforTab';
import { RegisterHistoryTab } from './RegisterHistory';
//App context
import { AppContext } from '../../contexts/AppContext';
//Auth actions
import { useAuth } from '../../hooks/authAction';
import { Redirect } from 'react-router-dom';

import {
    AUTH_SUCCESS
} from '../../utils/actionTypes';

export const Profile = () => {
    const { state, dispatch } = React.useContext(AppContext);
    const { AuthCheckState } = useAuth();
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid,
    )
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    if (state.auth.isAuthenticated) {
        return (
            <Layout>
                <Paralax
                    small
                    filter
                    image={'/static/media/default/profile-bg.jpg'}
                />
                <div className={classes.container}>
                    <GridContainer justify='center'>
                        <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.profile}>
                                <div>
                                    <img src={'/static/media/default/default-profile.png'} alt="..." className={imageClasses} />
                                </div>
                                <div className={classes.name}>
                                    <h3 className={classes.title}>{'Minh Đăng'}</h3>
                                    <h6>{'Lời Chúa là ánh sáng dõi bước con đi,'}</h6>
                                </div>
                            </div>
                        </GridItem>
                    </GridContainer>
                    <Divider />
                    <GridContainer justify='center' className={classes.marginTop3}>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomTabs
                                headerColor="rose"
                                tabs={[
                                    {
                                        tabName: "Cá nhân",
                                        tabIcon: Face,
                                        tabContent: (
                                            <PersonalInforTab />
                                        ),
                                    },
                                    {
                                        tabName: "Lịch sử",
                                        tabIcon: Chat,
                                        tabContent: (
                                            <RegisterHistoryTab />
                                        ),
                                    },
                                    {
                                        tabName: "Cài đặt",
                                        tabIcon: Build,
                                        tabContent: (
                                            <>p</>
                                        ),
                                    },
                                ]}
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </Layout>
        );
    } else {
        dispatch({
            type: AUTH_SUCCESS,  //after login successful, redirect back to profile page.
            payload: {
                isAuthenticated: false
                , redirect: '/account/profile'
                , isConfirmed: false
            }
        });
        return <Redirect to='/login' />
    }
};