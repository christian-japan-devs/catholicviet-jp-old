import React from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  aClasses: string
}

const Copyright: React.FC<Props> = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Dev by © '}
      <a color="inherit" className={props.aClasses} style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer" href="https://github.com/christian-japan-devs/">
        Christian Japan Devs
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
