import React from 'react';
// Mateiral-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    card: {
        display: 'flex',
        marginTop: '2rem',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 260,
    },
}));

type post = {
    title: string,
    auth?: string,
    date: string,
    description: string,
    image?: string,
    imageTitle?: string,
    detail?: string,
}
type propTypes = {
    posts: post[],
    title: string,
}

const Sidebar: React.FC<propTypes> = (props: propTypes) => {
    const classes = useStyles();
    const { posts, title } = props;
    return (
        <div className={classes.markdown}>
            <Typography variant='h6'>
                {title}
            </Typography>
            <Divider />
            {posts.map((post) => (
                <CardActionArea component='a' style={{ textDecoration: 'none' }} href={post.detail}>
                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography component='h4' variant='h6'>
                                    {post.title}
                                </Typography>
                                <Typography variant='subtitle1' color='textSecondary'>
                                    {post.auth}
                                </Typography>
                                <Typography variant='subtitle1' color='textSecondary'>
                                    {post.date}
                                </Typography>
                                <Typography variant='subtitle1' paragraph>
                                    {post.description}
                                </Typography>
                                <Typography variant='subtitle1' color='textSecondary'>
                                    {'Đọc tiếp'}
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </CardActionArea>
            ))}
        </div>
    );
};
export default Sidebar;