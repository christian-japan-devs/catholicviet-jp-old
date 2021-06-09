import { makeStyles } from '@material-ui/core/styles';

export const AuthStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none'
    , color: 'inherit'
    , backgroundColor: 'transparent'
  }
  ,
}));

export const HeaderStyles = makeStyles((theme) => ({
  logo: {
    margin: theme.spacing(1),
  },
}));

export const FooterStyles = makeStyles((theme) => ({
  logo: {
    margin: theme.spacing(1),
  },
}));
