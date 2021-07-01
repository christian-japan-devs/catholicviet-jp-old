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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TransitionProps } from '@material-ui/core/transitions';
import Button from "../../components/CustomButtons/Button";
//Components
//Utils
import { apiDomain, churchDetailURL } from '../../utils/apiEndpoint';
import { toDate } from '../../utils/utils';
import { Church } from './Church';
import { MassTime } from '../MassPage/MassTime';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 0,
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
        paddingRight: "24px",
        paddingBottom: "16px",
        paddingLeft: "24px",
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
    listItem: {
        display: 'table-col',
        textAlign: 'center',
    },
    itemText: {
        display: 'block',
        minWidth: '33%',
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
    church: Church,
    openDialog: boolean,
    onCloseDialog: () => void;
}
const ChurchDetail: React.FC<props> = ({ church, openDialog, onCloseDialog }) => {
    const classes = useStyles();

    React.useEffect(() => {
        fetch(churchDetailURL(church.id), {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then((res) => {
            for (var index in res) {
                var data = res[index];
                var massTimes: MassTime[] = []
                for (var index in data.massSchedules) {
                    var schedule = data.massSchedules[index];
                    var massTime: MassTime = {
                        id: parseInt(index),
                        day: schedule.split('-')[1],
                        time: schedule.split('-')[2],
                        language: schedule.split('-')[3]
                    }
                    massTimes.push(massTime);
                }
                var church: Church = {
                    id: data.id,
                    title: data.church_name,
                    image: data.church_image ? apiDomain + data.church_image : data.church_external_image,
                    description: data.church_brief_description,
                    subHeader: data.church_sub_name,
                    detailLink: '/nha-tho/chi-tiet/?id=' + data.id,
                    mapLink: data.church_map_link,
                    webLink: data.church_url,
                    phone: data.church_phone,
                    address: data.church_email,
                    massTime: massTimes,
                }
            }
        }).catch((err) => {

        })
    }, []);

    return (
        <Dialog
            classes={{
                root: classes.root,
                paper: classes.modal,
            }}
            open={openDialog}
            //TransitionComponent={Transition}
            keepMounted
            onClose={onCloseDialog}
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
                    onClick={onCloseDialog}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>{church.title}</h4>
            </DialogTitle>
            <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
            >
                <p>
                    {church.description}
                </p>
                <List>
                    {church.massTime.map((massTime) => (
                        <ListItem key={massTime.id} className={classes.listItem}>
                            <ListItemText className={classes.itemText} primary={massTime.day}></ListItemText>
                            <ListItemText className={classes.itemText} primary={massTime.time}></ListItemText>
                            <ListItemText className={classes.itemText} primary={massTime.language}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <Button color="transparent" simple size="sm" href="">
                    Xem thêm thông tin
                    </Button>
                <Button
                    onClick={onCloseDialog}
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

export default ChurchDetail;