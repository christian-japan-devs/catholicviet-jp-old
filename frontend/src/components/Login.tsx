import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';


import {AuthState} from '../utils/reducer.auth';
import { AuthStyles } from './Styles';

export interface LoginProps { 
    state:AuthState;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginProps> = (LoginProps:LoginProps) => {
    const classes = AuthStyles();
    return (
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component='h1' color='primary' variant='h4'>
          Vietcatholic Jp
      </Typography>
        <Typography component='h1' variant='h5'>
          Đăng nhập
      </Typography>
        <form className={classes.form} onSubmit={LoginProps.handleOnSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            value={LoginProps.state.username}
            fullWidth
            id='username'
            label='Tên đăng nhập'
            name='username'
            onChange={LoginProps.handleChange}
            helperText={LoginProps.state.helperText}
            error={LoginProps.state.isError}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            value={LoginProps.state.password}
            id='password'
            label='Mật khẩu'
            name='password'
            type='password'
            onChange={LoginProps.handleChange}
            helperText={LoginProps.state.helperText}
            error={LoginProps.state.isError}
          />
          {LoginProps.state.isError && (
            <Typography variant='body2'>{LoginProps.state.helperText}</Typography>
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
            disabled={LoginProps.state.loading}
            className={classes.submit}
          >
            Đăng nhập
        {LoginProps.state.loading && (
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
    );
}