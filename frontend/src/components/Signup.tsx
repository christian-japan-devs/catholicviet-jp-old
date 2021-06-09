import React from 'react';
//Material-Ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
//Custom
import { AuthStyles } from './Styles';
import { AuthState } from '../hooks/reducer.auth';

interface Props {
  state: AuthState;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SignupForm: React.FC<Props> = (props) => {
  const classes = AuthStyles();
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountCircleIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5" color="primary">
        Đăng ký tài khoản
      </Typography>
      {props.state.isErrorAt === 'somewhere' && (
        <Typography variant="h6" color="secondary">
          {props.state.helperText}
        </Typography>
      )}
      <form onSubmit={props.handleOnSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              value={props.state.username}
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              onChange={props.handleChange}
              helperText={
                props.state.isErrorAt === 'username'
                  ? props.state.helperText
                  : ''
              }
              error={props.state.isErrorAt === 'username'}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              value={props.state.email}
              required
              fullWidth
              id="email"
              label="Địa chỉ email"
              onChange={props.handleChange}
              helperText={
                props.state.isErrorAt === 'email' ? props.state.helperText : ''
              }
              error={props.state.isErrorAt === 'email'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="password"
              name="password"
              value={props.state.password}
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Mật khẩu"
              type="password"
              onChange={props.handleChange}
              helperText={
                props.state.isErrorAt === 'password'
                  ? props.state.helperText
                  : ''
              }
              error={props.state.isErrorAt === 'password'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="rePassword"
              name="rePassword"
              value={props.state.rePassword}
              variant="outlined"
              required
              fullWidth
              id="rePassword"
              label="Nhập lại mật khẩu"
              type="password"
              onChange={props.handleChange}
              helperText={
                props.state.isErrorAt === 'rePassword'
                  ? props.state.helperText
                  : ''
              }
              error={props.state.isErrorAt === 'rePassword'}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="agreewith" color="primary" />}
              label="Tôi đồng ý với các điều khoản của cộng đồng Công Giáo người Việt tại Nhật."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          disabled={props.state.loading}
          className={classes.submit}
        >
          Đăng ký
          {props.state.loading && (
            <CircularProgress size={30} color="secondary" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
