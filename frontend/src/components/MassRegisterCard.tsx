import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { toDate } from '../utils/utils';
import { LINK_BAI_DOC_CHI_TIET } from '../utils/constants';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    maxHeight: 320,
    paddingTop: '56.25%' //16:9
  },
  seatNo: {
    margin: '12px',
    textAlign: "center",
  },
  seatNoElement:{
    display: 'inline',
    whiteSpace:'nowrap',
    marginRight: '20px',
  },
  setElement: {
    width: '120px',
    marginRight: '4px',
  },
  resize:{
    fontSize:20
  },
  center:{
    textAlign: "center",
  },
  footer: {
    padding: "12px",
    textAlign: "center",
    margin: "0",
    '& button':{
        marginRight: "4px",
    },
    '& a':{
        marginRight: "4px",
    }
  }
});

export type MassRegsiter = {
  id: number,
  mass_date: string,
  mass_time: string,
  mass_title: string,
  mass_reading: string,
  mass_language: string,
  mass_father_celebrant?: string,
  mass_church: string,
  mass_slots: number,
  mass_slots_registered: number,
  mass_waiting?: number,
  mass_online_url?: string,
  mass_image: string,
  mass_waiting_flag: boolean,
  mass_active: boolean,
}

type Props = {
  massRegister: MassRegsiter,
  handleRegister:(id:number)=> void
}

export const MassRegisterCard: React.FC<Props> = ({massRegister, handleRegister}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardActionArea>
            <CardHeader 
                title={massRegister.mass_title}
                subheader={massRegister.mass_date}
            />
            <CardContent>
                <Typography variant="h6" component="h4" className={classes.center}>
                    Thời gian {massRegister.mass_time}
                </Typography>
                <Typography variant="h6" component="h4">
                    {massRegister.mass_church}
                </Typography>
                <div className={classes.seatNo}>
                    <div className={classes.seatNoElement}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Tổng số ghế"
                            defaultValue={"       "+massRegister.mass_slots}
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
                        <TextField
                            id="outlined-read-only-input"
                            label="Số ghế còn lại"
                            defaultValue={"        "+(massRegister.mass_slots-massRegister.mass_slots_registered)}
                            InputProps={{
                                readOnly: true,
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            className={classes.setElement} 
                            variant="outlined"
                            color="secondary"
                        />
                    </div>
                </div>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.footer}>
            {massRegister.mass_online_url===undefined?null:<Button variant="outlined" color="primary" href={massRegister.mass_online_url}>Trực tuyến</Button>}
            { (massRegister.mass_slots-massRegister.mass_slots_registered<=0)?null:
              <Button variant="outlined" color="secondary" onClick={ () => handleRegister(massRegister.id) }>Đăng ký</Button>}
            <Button variant="outlined" color="primary" href={LINK_BAI_DOC_CHI_TIET+massRegister.mass_date}>Bài đọc</Button>
        </CardActions>
    </Card>
  );
};

export default MassRegisterCard;