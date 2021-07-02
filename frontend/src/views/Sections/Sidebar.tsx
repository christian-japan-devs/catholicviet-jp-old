import React from 'react';
// Mateiral-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { NewFeed } from '../../components/NewFeed';
import { last } from 'ramda';

const useStyles = makeStyles((theme: Theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    card: {
        display: 'flex',
        marginTop: '2rem',
        padding: '0.5rem',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 260,
    },
}));

type Props = {
    posts: NewFeed[],
    title: string,
}

const Sidebar: React.FC<Props> = ({ posts, title }) => {
    const classes = useStyles();
    return (
        <div className={classes.markdown}>
            <Typography variant='h6'>
                {title}
            </Typography>
            <Divider />
            {posts.map((post) => (
                <CardActionArea key={post.id} component='a' style={{ textDecoration: 'none' }} href={post.detailUrl}>
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
                                <div dangerouslySetInnerHTML={post.description}></div>
                            </CardContent>
                        </div>
                    </Card>
                </CardActionArea>
            ))}
        </div>
    );
};
export default Sidebar;