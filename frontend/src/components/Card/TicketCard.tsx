import React from 'react';
// Mateiral-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QRCode from "react-qr-code";
import { toDate } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: '320px',
        textAlign: 'center',
    },
    seatNo: {
        margin: '12px',
        textAlign: "center",
    },
    seatNoElement: {
        display: 'inline',
        whiteSpace: 'nowrap',
        marginRight: '20px',
    },
    setElement: {
        width: '120px',
        marginRight: '4px',
    },
    resize: {
        fontSize: 20
    },
    center: {
        textAlign: "center",
    },
    footer: {
        padding: "12px",
        textAlign: "center",
        margin: "0",
        '& button': {
            marginRight: "4px",
        },
        '& a': {
            marginRight: "4px",
        }
    }
}));

export type Ticket = {
    id: number,
    title: string,
    date: string,
    time: string,
    name: string,
    seat?: string,
    code: string,
    confirm: string,
    status: string,
    approve?: string
}

type props = {
    ticket: Ticket,
    handleCancelRegister: (id: number, code: string) => void,
}

export const TicketCard: React.FC<props> = ({ ticket, handleCancelRegister }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                title={ticket.title}
                subheader={ticket.time + " ngày " + toDate(ticket.date)}
            />
            {ticket.confirm === "CF" ?
                <QRCode
                    value={ticket.code + ":" + ticket.id}
                    size={300}
                    bgColor='#FFFFFF'
                    fgColor='#000000'
                    level='L'
                /> : null
            }
            <CardContent>
                {
                    (ticket.status === "A" || ticket.status === "P") ?
                        <div className={classes.seatNo}>
                            <div className={classes.seatNoElement}>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Số Ghế"
                                    defaultValue={"       " + ticket.seat}
                                    InputProps={{
                                        readOnly: true,
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                    className={classes.setElement}
                                    variant="outlined"
                                    color="primary"
                                />
                            </div>
                        </div>
                        : null
                }
            </CardContent>
            <CardActions className={classes.footer}>
                {(ticket.status === "A" || ticket.status === "W") ? <Button variant="outlined" color="secondary" onClick={() => handleCancelRegister(ticket.id, ticket.code)}>Huỷ đăng ký</Button> : null}
            </CardActions>
        </Card>

    );
};
export default TicketCard;