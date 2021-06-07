import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardAction from '@material-ui/core/CardAction';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 720,
  },
  media: {
    maxHeight: 320,
    paddingTop: '56.25%' //16:9
  },

});

interface Props {
  newFeed: {
    id: number;
    title: string;
    auth: string;
    date: string;
    description?: string;
    content?: string;
    image?: string;
    detailUrl?: string;
    type?: string;
  }
}

const NewFeed: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={ }
  );
};

export default NewFeed;
