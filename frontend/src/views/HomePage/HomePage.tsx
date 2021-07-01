import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
//Components
import Layout from '../Layout';
import { MonthlyTopic, Props as TopicProps } from '../Sections/MonthlyTopic';
import Sidebar from '../Sections/Sidebar';
import MainSection from '../Sections/MainSection';
import Letter from '../Sections/Letter';
//Utils
import { apiDomain, monthlyTopicEnd, newfeedsURL } from '../../utils/apiEndpoint';
import { toDate } from '../../utils/utils';
import { NewFeed } from '../../components/NewFeed';
import { LETTER, GOSPEL, NEWS, INFORM, YOUTH, EVENT, LINK_CHU_DE_CHI_TIET, LINK_BAI_VIET_CHI_TIET } from '../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const HomePage: React.FC = () => {
    const classes = useStyles();
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
    var initNewFeed: NewFeed[] = [];
    const [monthlyTopic, setMonthlyTopicTypes] = React.useState(initTopic);
    const [newFeeds, setNewFeeds] = React.useState(initNewFeed);

    React.useEffect(() => {
        fetch(newfeedsURL, {
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
                var newFeed = {
                    id: data.id,
                    title: data.nf_title,
                    date: toDate(data.nf_date_created),
                    image: data.nf_image && (apiDomain + data.nf_image),
                    imageText: data.nf_title,
                    description: {
                        __html: data.nf_brief_content
                    },
                    detailUrl: LINK_BAI_VIET_CHI_TIET + data.id,
                    type: data.nf_type,
                }
                setNewFeeds(newFeeds => [...newFeeds, newFeed]);
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
    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth='lg'>
                <MonthlyTopic topic={monthlyTopic.topic} />
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        {newFeeds.filter(newFeeds => newFeeds.type === LETTER)[0] !== undefined ?
                            <Letter post={newFeeds.filter(newFeeds => newFeeds.type === LETTER)[0]} /> : null}
                        {newFeeds.filter(newFeeds => newFeeds.type === GOSPEL)[0] !== undefined ?
                            <MainSection title='Suy niệm' posts={newFeeds.filter(newFeeds => newFeeds.type === GOSPEL)} /> : null}
                        {newFeeds.filter(newFeeds => newFeeds.type === NEWS)[0] !== undefined ?
                            <MainSection title='Tin Tức' posts={newFeeds.filter(newFeeds => newFeeds.type === NEWS)} /> : null}
                        {newFeeds.filter(newFeeds => newFeeds.type === EVENT)[0] !== undefined ?
                            <MainSection title='Sự Kiện sắp tới' posts={newFeeds.filter(newFeeds => newFeeds.type === EVENT)} /> : null}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {newFeeds.filter(newFeeds => newFeeds.type === INFORM)[0] !== undefined ?
                            <Sidebar title='Thông Báo' posts={newFeeds.filter(newFeeds => newFeeds.type === INFORM)} /> : null}
                        {newFeeds.filter(newFeeds => newFeeds.type === YOUTH)[0] !== undefined ?
                            <Sidebar title='Giới Trẻ' posts={newFeeds.filter(newFeeds => newFeeds.type === YOUTH)} /> : null}
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default HomePage;