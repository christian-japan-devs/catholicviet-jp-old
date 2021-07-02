import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Button from '@material-ui/core/Button';
//Components
import Layout from '../Layout';
import { MonthlyTopic, Props as TopicProps } from '../Sections/MonthlyTopic';
import { MassRegsiter, MassRegisterCard } from '../../components/MassRegisterCard';
//Utils
import { apiDomain, monthlyTopicEnd, getListMassURL } from '../../utils/apiEndpoint';
import { toDate } from '../../utils/utils';
import { LINK_CHU_DE_CHI_TIET } from '../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    modal: {
        borderRadius: "6px",
    },
    modalHeader: {
        borderBottom: "none",
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "0",
        paddingLeft: "24px",
        minHeight: "16.43px",
    },
    modalTitle: {
        margin: "0",
        lineHeight: "1.42857143",
    },
    modalCloseButton: {
        color: "#999999",
        marginTop: "-12px",
        WebkitAppearance: "none",
        padding: "0",
        cursor: "pointer",
        background: "0 0",
        border: "0",
        fontSize: "inherit",
        opacity: ".9",
        textShadow: "none",
        fontWeight: 700,
        lineHeight: "1",
        float: "right",
    },
    modalClose: {
        width: "16px",
        height: "16px",
    },
    modalBody: {
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "16px",
        paddingLeft: "24px",
        position: "relative",
    },
    modalFooter: {
        padding: "15px",
        textAlign: "right",
        paddingTop: "0",
        margin: "0",
    },
    modalFooterCenter: {
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

const RegisterPage: React.FC = () => {
    var initTopic: TopicProps = {
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
    var initMassRegister: MassRegsiter[] = [];
    const [monthlyTopic, setMonthlyTopicTypes] = React.useState(initTopic);
    const [massRegisters, setMassRegisters] = React.useState(initMassRegister);
    const [openDialog, setOpenDialog] = React.useState(false);
    const classes = useStyles();

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
            for (var index in res) {
                var data = res[index];
                var massRegister = {
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
            var data = res[0];
            if (data) {
                var topic = {
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

    const handleRegister = (id: number) => {
        console.log(id);
        setOpenDialog(true);
    };

    const handleRegisterClick = ()=>{
        console.log('user register handle start');
    }

    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth='lg'>
                <MonthlyTopic topic={monthlyTopic.topic} />
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                        {massRegisters.map((massRegister) => (
                            <Grid key={massRegister.id} item xs={12} md={6}>
                                <MassRegisterCard massRegister={massRegister} handleRegister={handleRegister}/>
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
                    //TransitionComponent={Transition}
                    keepMounted
                    onClose={()=>setOpenDialog(false)}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                >
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                    >
                        <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={()=>setOpenDialog(false)}
                        >
                            <Close className={classes.modalClose} />
                        </IconButton>
                        <h4 className={classes.modalTitle}>Đăng ký tham dự Thánh Lễ</h4>
                    </DialogTitle>
                        <DialogContent
                            id="classic-modal-slide-description"
                            className={classes.modalBody}
                        >
                        </DialogContent>
                        <DialogActions className={classes.modalFooter}>
                            <Button color="secondary" onClick={()=>handleRegisterClick}>
                                Đăng ký
                                </Button>
                            <Button
                                onClick={()=>setOpenDialog(false)}
                                color="primary"
                            >
                                Đóng
                                </Button>
                        </DialogActions>
                    </Dialog>
            </Container>
        </Layout>
    );
};

export default RegisterPage;