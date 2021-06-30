import React from 'react';
//@Material-ui/core
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
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
import Layout from '../Layout';
import ChurchCard from './ChurchCard';
import ChurchDetail from './ChurchDetail';
//Utils
import { apiDomain, churchURL } from '../../utils/apiEndpoint';
import { MassTime } from '../MassPage/MassTime';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(12),
    }
}));

export type Church = {
    id: number,
    title: string,
    image: string,
    description?: string,
    subHeader?: string,
    detailLink?: string,
    mapLink?: string,
    webLink?: string,
    phone?: string,
    address?: string,
    massTime: MassTime[],
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const ChurchPage: React.FC = () => {
    const classes = useStyles();
    var initChurches: Church[] = [];
    var initChurch: Church = { id: 0, title: '', image: '', massTime: [] };
    const [churches, setChurches] = React.useState(initChurches);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [currentChurch, setCurrentChurch] = React.useState(initChurch);

    React.useEffect(() => {
        fetch(churchURL, {
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
                setChurches(churches => [...churches, church]);
            }
        }).catch((err) => {

        })
    }, []);



    const handleClick = (id: number) => {
        console.log(id);
        setCurrentChurch(churches.filter(churches => churches.id === id)[0])
        setOpenDialog(!openDialog);
    };

    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Grid container spacing={4} className={classes.mainGrid}>
                    <Grid key={0} item xs={12} md={8}>
                        <Grid container spacing={1}>
                            {churches.map((church) => (
                                <Grid item key={church.id} xs={12} md={6}>
                                    <ChurchCard church={church} onClick={handleClick} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item key={1} xs={12} md={4}>

                    </Grid>
                </Grid>
                <ChurchDetail church={currentChurch} openDialog={openDialog} onCloseDialog={() => setOpenDialog(false)} />
            </Container>
        </Layout>
    );
};

export default ChurchPage;