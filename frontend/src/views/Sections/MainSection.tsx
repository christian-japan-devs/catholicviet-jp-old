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
import { NewFeed } from '../../components/NewFeed';

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
    return (
        <div className={classes.markdown}>
            <Typography variant='h4'>
                {title}
            </Typography>
            <Divider />
            <Grid container spacing={4}>
                {
                    posts.map((post) => (
                        <Grid item xs >
                            <CardActionArea key={post.title} component='a' style={{ textDecoration: 'none' }} href={post.detailUrl}>
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
                                            <Typography variant='subtitle1' paragraph>
                                                <div dangerouslySetInnerHTML={post.description}></div>
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};
export default MainSection;