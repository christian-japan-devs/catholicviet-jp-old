import Typography from '@material-ui/core/Typography';

type propsType = {
  aClasses: string
}

const Copyright = (props: propsType) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Dev by © '}
      <a color="inherit" className={props.aClasses} style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer" href="https://github.com/christian-japan-devs/">
        Christian-japan-devs
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
