import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
//Components
import Layout from '../Layout';
import { MonthlyTopic, Props as TopicProps } from '../Sections/MonthlyTopic';
import { MassRegsiter, MassRegisterCard } from '../../components/MassRegisterCard';
//Utils
import { apiDomain, monthlyTopicEnd, getListMassURL } from '../../utils/apiEndpoint';
import { toDate } from '../../utils/utils';
import { LINK_CHU_DE_CHI_TIET } from '../../utils/constants';
import { MassTime } from '../MassPage/MassTime';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
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
    };

    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth='lg'>
                <MonthlyTopic topic={monthlyTopic.topic} />
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                        {massRegisters.map((massRegister) => {
                            <Grid item xs={12} md={6}>
                                <MassRegisterCard massRegister={massRegister} handleRegister={handleRegister}/>
                            </Grid>
                        })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default RegisterPage;