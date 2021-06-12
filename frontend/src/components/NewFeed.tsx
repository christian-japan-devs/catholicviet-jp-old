import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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

export type NewFeed = {
  id: number,
  title: string,
  date: string,
  auth?: string,
  description?: { __html: string; } | undefined,
  image?: string,
  imageText?: string,
  detailUrl?: string,
  content?: { __html: string; } | undefined,
  type?: string,
}

type Props = {
  newFeed: NewFeed
}

export const NewFeedCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={""}></Card>
  );
};

export default NewFeedCard;
