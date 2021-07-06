import React from 'react';
// Mateiral-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        maxWidth: '720px',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 260,
    },
}));

type props = {
    post: {
        title: string,
        auth?: string,
        date: string,
        description: string,
        image?: string,
        imageTitle?: string,
        detail: string
    }
}

const PreviewPost: React.FC<props> = ({post}) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={6} sm={6}>
            <CardActionArea component='a' style={{ textDecoration: 'none' }} href={post.detail}>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component='h2' variant='h5'>
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
                    <Hidden smDown>
                        <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
    );
};
export default PreviewPost;