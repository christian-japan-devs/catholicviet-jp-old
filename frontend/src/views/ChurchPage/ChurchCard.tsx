import React from 'react';
import classNames from "classnames";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DirectionsIcon from '@material-ui/icons/Directions';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LanguageIcon from '@material-ui/icons/Language';
import { IconButton } from '@material-ui/core';

import { Church } from './Church';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', //16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        title: {
            fontSize: 14,
        },
        listItem: {
            display: 'table-col',
            textAlign: 'center',
        },
        itemText: {
            display: 'block',
            minWidth: '33%',
        }
    }),
);

type ChurchCard = {
    church: Church
    onClick: (id: number) => undefined,
}

export const ChurchCard: React.FC<ChurchCard> = ({ church, onClick }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => onClick(church.id)} style={{ textDecoration: 'none' }}>
                <CardHeader
                    title={church.title}
                    subheader={church.subHeader}
                />
                <CardMedia
                    className={classes.media}
                    image={church.image}
                />
            </CardActionArea>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {church.description}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
                <IconButton aria-label={'Website'} target="_blank" href={church.webLink ? church.webLink : "#"}>
                    <LanguageIcon />
                </IconButton>
                <IconButton aria-label={'Điện thoại'} >
                    <PhoneIcon />
                </IconButton>
                <IconButton aria-label={'Email'}>
                    <MailOutlineIcon />
                </IconButton>
                <IconButton aria-label={'Dẫn đường'} target="_blank" href={church.mapLink ? church.mapLink : "#"}>
                    <DirectionsIcon />
                </IconButton>
                <IconButton
                    className={classNames(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label={'Xem thêm'}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <List>
                        {church.massTime.map((massTime) => (
                            <ListItem key={massTime.id} className={classes.listItem}>
                                <ListItemText className={classes.itemText} primary={massTime.day}></ListItemText>
                                <ListItemText className={classes.itemText} primary={massTime.time}></ListItemText>
                                <ListItemText className={classes.itemText} primary={massTime.language}></ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default ChurchCard;