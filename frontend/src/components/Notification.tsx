import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Typography from '@material-ui/core/Typography';
import Button from "./CustomButtons/Button";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    modal: {
        borderRadius: "6px",
    },
    modalHeader: {
        borderBottom: "none",
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "0",
        paddingLeft: "24px",
        minHeight: "16.43px",
    },
    modalTitle: {
        margin: "0",
        lineHeight: "1.42857143",
    },
    modalCloseButton: {
        color: "#999999",
        marginTop: "-12px",
        WebkitAppearance: "none",
        padding: "0",
        cursor: "pointer",
        background: "0 0",
        border: "0",
        fontSize: "inherit",
        opacity: ".9",
        textShadow: "none",
        fontWeight: 700,
        lineHeight: "1",
        float: "right",
    },
    modalClose: {
        width: "16px",
        height: "16px",
    },
    modalBody: {
        paddingTop: "24px",
        paddingRight: "12px",
        paddingBottom: "16px",
        paddingLeft: "12px",
        position: "relative",
        minHeight: "80px",
        minWidth: "280px"
    },
    modalFooter: {
        padding: "15px",
        textAlign: "right",
        paddingTop: "0",
        margin: "0",
    },
}));

export type Notification = {
    title: string,
    content: string,
    type: string,
}

type props = {
    notification: Notification,
    onOpen: boolean,
    onCloseDetail: () => void;
}

export const NotificationDialog: React.FC<props> = ({ notification, onOpen, onCloseDetail }) => {
    const classes = useStyles();
    const [fullScreen, setFullScreen] = React.useState(false);
    React.useEffect(() => {
        const width = window.innerWidth;
        if (width <= 900) {
            setFullScreen(true);
        } else {
            setFullScreen(false);
        }
    }, []);
    return (
        <Dialog
            classes={{
                root: classes.root,
                paper: classes.modal,
            }}
            open={onOpen}
            //TransitionComponent={Transition}
            fullScreen={fullScreen}
            keepMounted
            onClose={onCloseDetail}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
            >
                <IconButton
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onCloseDetail}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>{notification.title}</h4>
            </DialogTitle>
            <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
            >
                <Typography variant='h6' >
                    {notification.content}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <Button
                    onClick={onCloseDetail}
                    color="danger"
                    size="lg"
                    href=""
                    simple
                >
                    Đóng
                    </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotificationDialog;