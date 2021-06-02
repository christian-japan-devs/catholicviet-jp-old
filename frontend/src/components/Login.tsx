import React from 'react';
//Material-Ui
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
//Customer
import { AuthState } from '../hooks/reducer.auth';
import { AuthStyles } from './Styles';

interface LoginProps {
  state: AuthState;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginProps> = (props: LoginProps) => {
  const classes = AuthStyles();
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" color="primary" variant="h4">
        Công Giáo tại Nhật
      </Typography>
      <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography>
      {props.state.isErrorAt === 'somewhere' && (
        <Typography variant="h6" color="secondary">
          {props.state.helperText}
        </Typography>
      )}
      <form className={classes.form} onSubmit={props.handleOnSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={props.state.username}
          fullWidth
          id="username"
          label="Tên đăng nhập"
          name="username"
          onChange={props.handleChange}
          helperText={
            props.state.isErrorAt === 'username' ? props.state.helperText : ''
          }
          error={props.state.isErrorAt === 'username'}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={props.state.password}
          id="password"
          label="Mật khẩu"
          name="password"
          type="password"
          onChange={props.handleChange}
          helperText={
            props.state.isErrorAt === 'password' ? props.state.helperText : ''
          }
          error={props.state.isErrorAt === 'password'}
        />
        <FormControlLabel
          control={<Checkbox value={props.state.remember} color="primary" />}
          label="Nhớ đăng nhập"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          disabled={props.state.loading}
          className={classes.submit}
        >
          Đăng nhập
          {props.state.loading && (
            <CircularProgress size={30} color="secondary" />
          )}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/resetpw" color="inherit">
              {`Quên mật khẩu`}
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" color="inherit">
              {`Chưa có tài khoản? Đăng ký`}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
