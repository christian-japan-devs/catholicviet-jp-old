import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { TransitionProps } from '@material-ui/core/transitions';
import Button from "../../components/CustomButtons/Button";
//Components
import { NewFeed } from '../../components/NewFeed';

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
    },
    modalFooter: {
        padding: "15px",
        textAlign: "right",
        paddingTop: "0",
        margin: "0",
    },
    modalFooterCenter: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    cardMedia: {
        width: '100%',
        minHeight: '320px'
    }
}));


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

type props = {
    newFeed: NewFeed,
    openDetail: boolean,
    onCloseDetail: () => void;
}

const NewFeedDetail: React.FC<props> = ({ newFeed, openDetail, onCloseDetail }) => {
    const classes = useStyles();
    const [fullScreen, setFullScreen] = React.useState(false);
    React.useEffect(() =>{
        const width = window.innerWidth;
        if(width <= 900){
            setFullScreen(true);
        } else{
            setFullScreen(false);
        }
    },[]);
    return (
        <Dialog
            classes={{
                root: classes.root,
                paper: classes.modal,
            }}
            open={openDetail}
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
                <h4 className={classes.modalTitle}>{newFeed.title}</h4>
            </DialogTitle>
            <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
            >
                {newFeed.imageText?<CardMedia className={classes.cardMedia} image={newFeed.image} title={newFeed.imageText} />:null}
                <Typography variant='subtitle1' color='textSecondary'>
                    {newFeed.auth}
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                    {newFeed.date}
                </Typography>
                <div dangerouslySetInnerHTML={newFeed.content}></div>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <Button color="transparent" simple size="sm" href="">
                    Chia sẻ
                    </Button>
                <Button
                    onClick={onCloseDetail}
                    color="danger"
                    size="sm"
                    href=""
                    simple
                >
                    Đóng
                    </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewFeedDetail;