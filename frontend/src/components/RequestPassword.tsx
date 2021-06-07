import React from 'react';
//Material-Ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
  handleOnClear: () => void;
}

export const ResetPasswordRequestForm: React.FC<Props> = (props) => {
  const classes = AuthStyles();
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountCircleIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" color="primary" variant="h4">
        Quên mật khẩu
      </Typography>
      <br />
      {props.state.isErrorAt === 'somewhere' && (
        <Typography variant="body2" color="secondary">
          {props.state.helperText}
        </Typography>
      )}
      <br />
      <form onSubmit={props.handleOnSubmit} className={classes.form} noValidate>
        <Grid id="top-row" container spacing={2}>
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
                props.state.isErrorAt === 'email' ? props.state.helperText : 'Nhập địa chỉ email đã đăng ký để tạo lại mật khẩu'
              }
              error={props.state.isErrorAt === 'email'}
            />
          </Grid>
        </Grid>
        <Grid id="bottom-row" container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              disabled={props.state.loading}
              className={classes.submit}
            >
              {
                props.state.isErrorAt === 'email' ? 'Gửi lại' : 'Gửi yêu cầu'
              }
              {props.state.loading && (
                <CircularProgress size={30} color="secondary" />
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="reset"
              variant="contained"
              fullWidth
              color="secondary"
              onClick={props.handleOnClear}
              className={classes.submit}
            >
              Xoá
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
