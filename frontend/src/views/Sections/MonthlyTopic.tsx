import Rect from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainMonthlyTopic: {
        minHeight: 400,
        maxHeight: 600,
        position: 'relative',
        backgroundColor: '#60aec1',
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0.3)',
    },
    mainMonthlyTopicContent: {
        position: 'relative',
        marginTop: '4rem',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        }
    }
}));

export type Props = {
    topic: {
        id: number,
        image: string,
        imageText: string,
        title: string,
        description: { __html: string; } | undefined,
        linkText: string,
        month: string,
    }
}

export const MonthlyTopic: React.FC<Props> = (props) => {
    const classes = useStyles();
    const topic = props.topic;
    console.log(topic);
    return (
        <Paper className={classes.mainMonthlyTopic} style={{ backgroundImage: !!topic.image ? `url(${topic.image})` : `url(/static/media/default/topic_default_bg_01.jpg)` }}>
            {/* Increase the priority of the hero background image*/}
            {<img style={{ display: 'none' }} src={!!topic.image ? topic.image : ''} alt={topic.imageText} />}
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainMonthlyTopicContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {topic.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            <div dangerouslySetInnerHTML={topic.description}></div>
                        </Typography>
                        <Link variant='subtitle1' style={{ textDecoration: 'none', color: 'inherit' }} href={topic.linkText}>
                            {!!topic.image ? 'Xem chi tiết.' : ""}
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default MonthlyTopic;
