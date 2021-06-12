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
import { NewFeed } from '../../components/NewFeed';

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
    return (
        <div className={classes.markdown}>
            <Typography component='h3' variant='h4'>
                {post.title}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
                {post.auth}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
                {post.date}
            </Typography>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageText} />
            <Typography variant='subtitle1' paragraph>
                <div dangerouslySetInnerHTML={post.content}></div>
            </Typography>
            <Divider />
        </div>
    );
};
export default Letter;