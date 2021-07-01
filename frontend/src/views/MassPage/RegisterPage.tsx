import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
//Components
import Layout from '../Layout';
import { MonthlyTopic, Props as TopicProps } from '../Sections/MonthlyTopic';
//Utils
import { apiDomain, monthlyTopicEnd } from '../../utils/apiEndpoint';
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
    const [monthlyTopic, setMonthlyTopicTypes] = React.useState(initTopic);
    const classes = useStyles();

    React.useEffect(() => {

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
    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth='lg'>
                <MonthlyTopic topic={monthlyTopic.topic} />
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        
                    </Grid>
                    <Grid item xs={12} md={4}>
                        
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default RegisterPage;