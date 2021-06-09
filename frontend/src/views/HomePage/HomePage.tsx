import React from "react";
//
import Layout from '../../components/Layout';
import { MonthlyTopic, Props as TopicProps } from '../../components/TopicTheme/MonthlyTopic';
import { apiDomain, monthlyTopicEnd } from '../../utils/apiEndpoint';

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
const HomePage: React.FC = () => {
    const [monthlyTopic, setMonthlyTopicTypes] = React.useState(initTopic as TopicProps);

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
            <MonthlyTopic topic={monthlyTopic.topic} />
        </Layout>
    );
};

export default HomePage;