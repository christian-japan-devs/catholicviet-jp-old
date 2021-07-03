import React from 'react';
// Mateiral-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
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

export type Ticket = {
    id: number,
    title: string,
    date: string,
    time: string,
    seat?: string,
    code?: string,
    confirm?: boolean,
    approve?: string
}

type props = {
    tiket: Ticket
}

export const TicketCard: React.FC<props> = ({ tiket }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={6} sm={6}>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component='h2' variant='h5'>
                            {tiket.title}
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            {tiket.time}
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            {tiket.date}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
};
export default TicketCard;