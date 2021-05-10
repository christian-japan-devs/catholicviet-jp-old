import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Redirect } from 'react-router-dom';
//redux stuff
import { connect } from 'react-redux';
import { authLogin } from '../../store/actions/cauth';
import { FormData } from '../../store/types/auth';
import Copyright from '../other/Copyright';
//import styles from './login.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

const LoginForm = (props: any) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({} as FormData);
  const { loading, token, isAuthenticated } = props;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // client side validation here
    const { username, password } = values;
    console.log('start login');
    props.login(username, password);
  };

  const handleChange = (e: any) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  if (token) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon fontSize="large"/>
          </Avatar>
          <Typography component='h1' color='primary' variant='h4'>
            Vietcatholic Jp 
          </Typography>
          <Typography component='h1' variant='h5'>
            Đăng nhập 
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              value={values.username}
              fullWidth
              id='username'
              label='Tên đăng nhập'
              name='username'
              onChange={handleChange}
              helperText={errors.username}
              error={!!errors.username}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={values.password}
              id='password'
              label='Mật khẩu'
              name='password'
              type='password'
              onChange={handleChange}
              helperText={errors.password1}
              error={!!errors.password1}    // passowrd1 in type errors is same with password,
            />
            {errors && (
              <Typography variant='body2'>{errors.message}</Typography>
            )}
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Nhớ đăng nhập'
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              color='primary'
              disabled={loading}
              className={classes.submit}
            >
              Đăng nhập
            {loading && (
                <CircularProgress size={30} color='secondary' />
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/resetpw' color='inherit'>
                  {`Quên mật khẩu`}
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup' color='inherit'>
                  {`Chưa có tài khoản? Đăng ký`}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
};

//This map the states to our props in this functional component
const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
});

// This map actions to our props in this functional component
const mapActionsToProps = (dispatch: any) => {
  return {
    login: (username: string, passowrd: string) =>
      dispatch(authLogin(username, passowrd)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(LoginForm);
