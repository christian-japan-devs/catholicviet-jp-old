import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authSignup } from '../../store/actions/cauth';
import { FormData } from '../../types/types/auth';
import Copyright from '../other/Copyright';

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

const Signup = (props: any) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: '',
    holyname: '',
    name: '',
    email: '',
    address: '',
    password1: '',
    password2: ''
  });

  const [errors, setErrors] = useState({} as FormData);
  const { loading, token } = props;

  const formDataValid: FormData = {
    username: '',
    holyname: '',
    name: '',
    email: '',
    address: '',
    password1: '',
    password2: '',
    message: ''
  }

  const handleSignup = (e: any) => {
    e.preventDefault();
    if (values.username.length <= 8) {         // client side validation here
      formDataValid.username = 'Tên đăng nhập phải dài hơn 8 ký tự';
      setErrors(formDataValid);
    } else {
      formDataValid.username = '';
      setErrors(formDataValid);
      const { username, email, password1, password2 } = values;
      props.signup(username, email, password1, password2);
    }
  }

  const handleChange = (e: any) => {
    setValues((values) => ({
      ...values, [e.target.name]: e.target.value,
    }))
  }

  if (token) {
    return (
      <Redirect to='/' /> //welcome popup show here
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
          <Typography component='h1' color='primary' variant='h4'>
            Vietcatholic Jp
          </Typography>
          <Typography component='h1' variant='h5'>
            Đăng ký
          </Typography>
          <form onSubmit={handleSignup} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='username'
                  name='username'
                  variant='outlined'
                  value={values.username}
                  required
                  fullWidth
                  id='username'
                  label='Tên đăng nhập'
                  onChange={handleChange}
                  helperText={errors.username}
                  error={!!errors.username}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='holyname'
                  name='holyname'
                  variant='outlined'
                  value={values.holyname}
                  required
                  fullWidth
                  id='holyname'
                  label='Tên Thánh'
                  onChange={handleChange}
                  helperText={errors.holyname}
                  error={!!errors.holyname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='name'
                  name='name'
                  variant='outlined'
                  value={values.name}
                  required
                  fullWidth
                  id='name'
                  label='Họ và Tên'
                  onChange={handleChange}
                  helperText={errors.name}
                  error={!!errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  name='email'
                  variant='outlined'
                  value={values.email}
                  required
                  fullWidth
                  id='email'
                  label='Địa chỉ email'
                  helperText={errors.email}
                  error={!!errors.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='address'
                  name='address'
                  variant='outlined'
                  value={values.address}
                  required
                  fullWidth
                  id='address'
                  label='Địa chỉ chỗ ở hiện tại'
                  helperText={errors.address}
                  error={!!errors.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='password1'
                  name='password1'
                  value={values.password1}
                  onChange={handleChange}
                  variant='outlined'
                  required
                  fullWidth
                  id='password1'
                  label='Mật khẩu'
                  type="password"
                  helperText={errors.password1}
                  error={!!errors.password1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='password2'
                  name='password2'
                  value={values.password2}
                  onChange={handleChange}
                  variant='outlined'
                  required
                  fullWidth
                  id='password2'
                  label='Nhập lại mật khẩu'
                  helperText={errors.password2}
                  error={!!errors.password2}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='agreewith' color='primary' />}
                  label="Tôi đồng ý với các điều khoản của cộng đồng Công Giáo người Việt tại Nhật."
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              variant='contained'
              fullWidth
              color='primary'
              disabled={loading}
              className={classes.submit}
            >
              Đăng ký
              {loading && (
                <CircularProgress size={30} color="secondary" />
              )}
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
};

//Map the states to local props
const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
});

// map actions to local props in this functional component

const mapActionsToProps = (dispatch: any) => {
  return {
    signup: (username: string, email: string, password1: string, password2: string) =>
      dispatch(authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
