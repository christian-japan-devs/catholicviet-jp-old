import React from 'react';
// Mateiral-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import { NewFeed } from '../../components/NewFeed';

import { apiDomain, newfeedDetailURL, newfeedsURL } from '../../utils/apiEndpoint';

const useStyles = makeStyles((theme: Theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    cardMedia: {
        width: '100%',
    },
}));

type Props = {
    post: NewFeed
}

const Letter: React.FC<Props> = ({ post }) => {
    const classes = useStyles();
    var initNewFeed: NewFeed = {
        id: 0,
        title: '',
        date: '',
        content: { __html: '' },
        type: ''
    };
    const [newFeed, setNewFeed] = React.useState(initNewFeed);
    React.useEffect(() => {
        fetch(newfeedDetailURL(post.id), {
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
            var newFeed: NewFeed = {
                id: res.id,
                title: res.nf_title,
                date: res.nf_date_created,
                image: apiDomain + res.nf_image,
                imageText: res.nf_title,
                content: {
                    __html: res.nf_content
                },
                type: res.nf_type,
            }
            setNewFeed(newFeed);
        })
    }, []);
    return (
        <div className={classes.markdown}>
            <Typography component='h3' variant='h4'>
                {newFeed.title}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
                {newFeed.auth}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
                {newFeed.date}
            </Typography>
            <CardMedia className={classes.cardMedia} image={newFeed.image} title={newFeed.imageText} />
            <Typography variant='subtitle1' paragraph>
                <div dangerouslySetInnerHTML={newFeed.content}></div>
            </Typography>
            <Divider />
        </div>
    );
};
export default Letter;