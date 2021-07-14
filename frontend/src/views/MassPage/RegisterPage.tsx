import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
//Components
import Layout from '../Layout';
import { MonthlyTopic, Props as TopicProps } from '../Sections/MonthlyTopic';
import { MassRegsiter, MassRegisterCard } from '../../components/Card/MassRegisterCard';
import { Ticket, TicketCard } from '../../components/Card/TicketCard';
//Utils
import { apiDomain, monthlyTopicEnd, getListMassURL, massRegisterURL } from '../../utils/apiEndpoint';
import { toDate, getHeaderWithAuthentication, cancelRegistration } from '../../utils/utils';
import { LINK_LOGIN, LINK_CHU_DE_CHI_TIET, LINK_MASS_REGISTER } from '../../utils/constants';
//App context
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import {
    AUTH_SUCCESS
} from '../../utils/actionTypes';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    modal: {
        borderRadius: '6px',
    },
    modalHeader: {
        borderBottom: 'none',
        paddingTop: '24px',
        paddingRight: '24px',
        paddingBottom: '0',
        paddingLeft: '24px',
        minHeight: '16.43px',
    },
    modalTitle: {
        margin: '0',
        textAlign: 'center',
        lineHeight: '1.5',
    },
    modalCloseButton: {
        color: '#999999',
        marginTop: '-12px',
        WebkitAppearance: 'none',
        padding: '0',
        cursor: 'pointer',
        background: '0 0',
        border: '0',
        fontSize: 'inherit',
        opacity: '.9',
        textShadow: 'none',
        fontWeight: 700,
        lineHeight: '1',
        float: 'right',
    },
    modalClose: {
        width: '16px',
        height: '16px',
    },
    modalBody: {
        paddingTop: '24px',
        paddingRight: '24px',
        paddingBottom: '16px',
        paddingLeft: '24px',
        position: 'relative',
    },
    modalFooter: {
        padding: '15px',
        textAlign: 'right',
        paddingTop: '0',
        margin: '0',
    },
    modalFooterCenter: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

type registerForm = {
    mass_id: number,
    condition: number,
    agreeWithTerm: boolean,
}

const RegisterPage: React.FC = () => {
    const classes = useStyles();

    let initTopic: TopicProps = {
        topic: {
            id: 1,
            image: '',
            imageText: '',
            title: '',
            description: { __html: '' },
            linkText: '',
            month: '',
        }
    }
    let initTicket: Ticket = {
        id: 0,
        title: '',
        date: '',
        time: '',
        name: '',
        seat: '',
        code: '',
        confirm: '',
        status: '',
        approve: ''
    }
    let initRegisterForm: registerForm = {
        mass_id: -1,
        condition: 0,
        agreeWithTerm: false,
    }
    let initMassRegister: MassRegsiter[] = [];

    const { state, dispatch } = React.useContext(AppContext);
    const [monthlyTopic, setMonthlyTopicTypes] = React.useState(initTopic);
    const [massRegisters, setMassRegisters] = React.useState(initMassRegister);
    const [ticket, setTicket] = React.useState(initTicket);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [registerFormValue, setRegisterFormValue] = React.useState(initRegisterForm);
    const [redirectToLogin, setRedirectToLogin] = React.useState(false);

    React.useEffect(() => {

        fetch(getListMassURL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then((res) => {
            for (let index in res) {
                let data = res[index];
                let massRegister = {
                    id: data.id,
                    mass_date: toDate(data.mass_date),
                    mass_time: data.mass_time,
                    mass_title: data.mass_title,
                    mass_reading: data.mass_reading,
                    mass_language: data.mass_language,
                    mass_father_celebrant: data.mass_father_celebrant,
                    mass_church: data.mass_church,
                    mass_slots: data.mass_slots,
                    mass_slots_registered: data.mass_slots_registered,
                    mass_waiting: data.mass_waiting,
                    mass_online_url: data.mass_online_url,
                    mass_image: data.mass_image && (apiDomain + data.mass_image),
                    mass_waiting_flag: data.mass_waiting_flag,
                    mass_active: data.mass_active
                }
                setMassRegisters(massRegisters => [...massRegisters, massRegister]);
            }
        }).catch((err) => {
            //TODO:
        });

        fetch(monthlyTopicEnd, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then((res) => {
            let data = res[0];
            if (data) {
                let topic = {
                    id: data.id,
                    image: apiDomain + data.mt_image_main,
                    imageText: data.mt_image_main_text,
                    title: data.mt_title,
                    description: {
                        __html: data.mt_brief_content
                    },
                    linkText: LINK_CHU_DE_CHI_TIET + data.mt_month,
                    month: data.mt_month,
                }
                setMonthlyTopicTypes({
                    ...monthlyTopic,
                    topic: topic
                })
            }
        })
    }, []);

    const handleRegisterCard = (id: number) => {
        //Check authenticated user
        if (state.auth.isAuthenticated) {
            setRegisterFormValue({
                ...registerFormValue,
                mass_id: id
            });
            setOpenDialog(true);
        } else {
            dispatch({
                type: AUTH_SUCCESS,  //after login successful, redirect back to register page.
                payload: {
                    isAuthenticated: false
                    , redirect: LINK_MASS_REGISTER
                    , isConfirmed: false
                }
            });
            setRedirectToLogin(true);
        }
    };

    const handleOnSubmit = () => {
        //Cannot submit the default form values
        if (registerFormValue.mass_id === -1 || registerFormValue.condition === 0 || !registerFormValue.agreeWithTerm) {
            //TODO: throw err notification.
        } else {
            if (state.auth.isAuthenticated) {
                let headers = getHeaderWithAuthentication();
                fetch(massRegisterURL, {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify({
                        mid: registerFormValue.mass_id,
                        ucondi: registerFormValue.condition
                    }),
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        throw res;
                    })
                    .then((res) => {
                        const ticket: Ticket = {
                            id: res.id,
                            title: res.registration_mass.mass_title,
                            date: res.registration_date,
                            time: res.registration_mass.mass_time,
                            name: res.registration_user,
                            seat: res.registration_seat,
                            code: res.registration_confirm_code,
                            confirm: res.registration_confirm_status,
                            status: res.registration_status,
                            approve: res.registration_approve_status
                        }
                        setTicket(ticket);
                        //setOpenDialog(false);
                    })
                    .catch((err) => {
                        //TODO: throw err notification.
                    });
            }
        }
        setRegisterFormValue({
            ...registerFormValue,
            agreeWithTerm: false,
            condition: 0
        })
        console.log('user register handle start');
    };

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterFormValue({
            ...registerFormValue,
            agreeWithTerm: event.target.checked
        })
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        switch (event.target.name) {
            case 'register-condition': {
                setRegisterFormValue({
                    ...registerFormValue,
                    condition: parseInt(typeof event.target.value === 'string' ? event.target.value : '0')
                })
                return;
            }
        }
    };

    const handleCancelRegister = (id: number, code: string) => {
        let result = cancelRegistration("mass", id, code);
        //TODO: Show cancel action result
    }

    if (!state.auth.isAuthenticated && redirectToLogin) {
        return <Redirect push to={LINK_LOGIN} />
    } else {
        return (
            <Layout>
                <CssBaseline />
                <Container maxWidth='lg'>
                    <MonthlyTopic topic={monthlyTopic.topic} />
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                {massRegisters.map((massRegister) => (
                                    <Grid key={massRegister.id} item xs={12} md={6}>
                                        <MassRegisterCard massRegister={massRegister} handleRegister={handleRegisterCard} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>

                        </Grid>
                    </Grid>
                    <Dialog
                        classes={{
                            root: classes.root,
                            paper: classes.modal,
                        }}
                        open={openDialog}
                        keepMounted
                        onClose={() => setOpenDialog(false)}
                        aria-labelledby='classic-modal-slide-title'
                        aria-describedby='classic-modal-slide-description'
                    >
                        <DialogTitle
                            id='classic-modal-slide-title'
                            disableTypography
                            className={classes.modalHeader}
                        >
                            <IconButton
                                className={classes.modalCloseButton}
                                key='close'
                                aria-label='Close'
                                color='inherit'
                                onClick={() => setOpenDialog(false)}
                            >
                                <Close className={classes.modalClose} />
                            </IconButton>
                            <h4 className={classes.modalTitle}>ĐĂNG KÝ DỰ THÁNH LỄ</h4>
                        </DialogTitle>
                        <DialogContent
                            id='classic-modal-slide-description'
                            className={classes.modalBody}
                        >
                            {
                                ticket.status != "" ?
                                    <TicketCard ticket={ticket} handleCancelRegister={handleCancelRegister} />
                                    :
                                    <>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor='condition-native'>Sức khoẻ gần đây của bạn thế nào?</InputLabel>
                                            <Select
                                                native
                                                value={registerFormValue.condition}
                                                onChange={handleChange}
                                                name='register-condition'
                                            >
                                                <option value='0'>Chọn câu trả lời</option>
                                                <option value='1'>Tốt</option>
                                                <option value='2'>Không khoẻ</option>
                                                <option value='3'>Bị ốm gần đây</option>
                                            </Select>
                                        </FormControl>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={registerFormValue.agreeWithTerm}
                                                color='secondary'
                                                name='register-agree-term'
                                                onChange={handleCheckChange} />}
                                            label='Tôi đồng ý với các quy định chung trong mùa dịch của Nhà thờ.'
                                        />
                                    </>
                            }
                        </DialogContent>
                        <DialogActions className={classes.modalFooter}>
                            {ticket.status === "" ? <Button color='secondary' onClick={() => handleOnSubmit()}>Đăng ký</Button> : null}
                            <Button color='primary' onClick={() => setOpenDialog(false)}>Đóng</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Layout>
        );
    }
};

export default RegisterPage;