import React from 'react';
//Material-Ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
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

export const ResetPasswordForm: React.FC<Props> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const classes = AuthStyles();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountCircleIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" color="primary" variant="h4">
        Đặt lại mật khẩu.
      </Typography>
      {props.state.isErrorAt === 'somewhere' && (
        <Typography variant="body2" color="secondary">
          {props.state.helperText}
        </Typography>
      )}
      <form onSubmit={props.handleOnSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          {
            props.state.isAuthenticated ?
              <Grid item xs={12}>
                <TextField
                  autoComplete="oldPassword"
                  name="oldPassword"
                  value={props.state.oldPassword}
                  variant="outlined"
                  required
                  fullWidth
                  id="oldPassword"
                  label="Mật khẩu cũ"
                  type={showPassword ? "text" : "password"}
                  onChange={props.handleChange}
                  helperText={
                    props.state.isErrorAt === 'oldPassword'
                      ? props.state.helperText
                      : 'Nếu quên vui lòng đăng xuất và yêu cầu đổi mật khẩu mới.'
                  }
                  error={props.state.isErrorAt === 'oldPassword'}
                />
              </Grid> : null
          }
          <Grid item xs={12}>
            <TextField
              autoComplete="password"
              name="password"
              value={props.state.password}
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Mật khẩu mới"
              type={showPassword ? "text" : "password"}
              onChange={props.handleChange}
              helperText={
                props.state.isErrorAt === 'password'
                  ? props.state.helperText
                  : 'Mật khẩu phải dài tối thiểu 8 ký tự, bao gồm cả chữ và số và không được chứa tên đăng nhập.'
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
              label="Nhập lại mật khẩu mới"
              type={showPassword ? "text" : "password"}
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
              control={<Checkbox value="agreewith" color="primary" onClick={handleShowPassword} />}
              label="Hiển thị mật khẩu."
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              disabled={props.state.loading}
              className={classes.submit}
            >
              Cập nhật
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={props.handleOnClear}
              className={classes.submit}
            >
              Huỷ
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
