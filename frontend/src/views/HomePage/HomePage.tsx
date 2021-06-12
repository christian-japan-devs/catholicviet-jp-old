import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
//Components
import Layout from '../Layout';
import { MonthlyTopic, Props as TopicProps } from '../../components/TopicTheme/MonthlyTopic';
import Sidebar from '../Sections/Sidebar';
import MainSection from '../Sections/MainSection';
//Utils
import { apiDomain, monthlyTopicEnd } from '../../utils/apiEndpoint';


const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

var initTopic = {
    topic: {
        id: 1,
        image: '',
        imageText: '',
        title: '',
        description: '',
        linkText: '/monthly-topic/detail/',
        month: '',
    }
}

const featuredPosts = [
    {
        title: 'MỘT NGƯỜI CHA TRONG BÓNG TỐI',
        date: '2021-06-04',
        auth: 'Josh. N',
        description:
            'Ngày 8 tháng 12 năm 2020, Đức Phanxicô đã khiến thế giới ngạc nhiên một lần nữa khi ra Tông thư tuyên bố “Năm Thánh Giuse”. Tôi có thể mường tượng ra không ít giám mục và linh mục buộc miệng: “Lại một năm chủ đề nữa rồi!”',
        image: '/static/media/default/topic_default_bg_01.jpg',
        imageText: 'Image Text',
        detail: '/thu-muc-vun/chi-tiet/'
    },
    {
        title: 'THÁNH CẢ GIU-SE VỚI LỜI KHẨN NGUYỆN CỦA CHÚNG TA ',
        date: '2021-06-06',
        auth: 'Josh. N',
        description:
            'Trong chúng ta, khi được hỏi về lí do tại sao bản thân lại sùng kính Thánh Giu-se như vậy, thì chắc hẳn mỗi người đều có lời giải đáp riêng,',
        image: '/static/media/default/topic_default_bg_01.jpg',
        imageText: 'Image Text',
        detail: '/thu-muc-vun/chi-tiet/'
    },
];

const HomePage: React.FC = () => {
    const [monthlyTopic, setMonthlyTopicTypes] = React.useState(initTopic as TopicProps);
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
                    description: data.mt_brief_content,
                    linkText: '/monthly-topic/detail/' + data.mt_month,
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
                        <MainSection title='Thư mục vụ' posts={featuredPosts} />
                        <MainSection title='Tin tức' posts={featuredPosts} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Sidebar title='Giới trẻ' posts={featuredPosts} />
                        <Sidebar title='Văn hoá Nhật' posts={featuredPosts} />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default HomePage;