import React from 'react';
// Mateiral-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
//Custom
import NewFeedDetail from './NewFeedDetail';
import { NewFeed } from '../../components/NewFeed';
import { apiDomain, newfeedDetailURL } from '../../utils/apiEndpoint';
import { toDate } from '../../utils/utils';

const useStyles = makeStyles((theme: Theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    card: {
        marginTop: '1rem',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        minHeight: 260,
    },
}));

type Props = {
    posts: NewFeed[],
    title?: string
}

const MainSection: React.FC<Props> = ({ posts, title }) => {
    const classes = useStyles();
    const [openDetail, setOpenDetail] = React.useState(false);
    let initNewFeed: NewFeed = {
        id: 0,
        title: '',
        date: '',
        content: { __html: '' },
        type: ''
    };
    const [newFeed, setNewFeed] = React.useState(initNewFeed);

    const handleDetailClick = (id: number) => {
        fetch(newfeedDetailURL(id), {
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
            let newFeed: NewFeed = {
                id: res.id,
                title: res.nf_title,
                date: toDate(res.nf_date_created),
                image: apiDomain + res.nf_image,
                imageText: res.nf_image ? res.nf_title : '',
                content: {
                    __html: res.nf_content
                },
                type: res.nf_type,
            }
            setNewFeed(newFeed);
            setOpenDetail(!openDetail);
        })
    };

    return (
        <div className={classes.markdown}>
            <Typography variant='h4'>
                {title}
            </Typography>
            <Divider />
            <Grid container spacing={4}>
                {
                    posts.map((post) => (
                        <Grid key={post.title} item xs={12} sm={6} >
                            <CardActionArea component='a' style={{ textDecoration: 'none' }} onClick={() => handleDetailClick(post.id)}>
                                <Card className={classes.card}>
                                    {post.image && <CardMedia className={classes.cardMedia} image={post.image} title={post.imageText} />}
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component='h3' variant='h5'>
                                                {post.title}
                                            </Typography>
                                            <Typography variant='subtitle1' color='textSecondary'>
                                                {post.auth}
                                            </Typography>
                                            <Typography variant='subtitle1' color='textSecondary'>
                                                {post.date}
                                            </Typography>
                                            <div style={{ fontSize: 16 }} dangerouslySetInnerHTML={post.description}></div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
            </Grid>
            <NewFeedDetail newFeed={newFeed} openDetail={openDetail} onCloseDetail={() => setOpenDetail(false)} />
        </div>
    );
};
export default MainSection;