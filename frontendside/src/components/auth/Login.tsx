import React, { useState, useEffect } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory, useLocation } from 'react-router-dom';
//redux stuff
import { connect } from 'react-redux';
import { authLogin } from '../../store/actions/cauth';
//import styles from './login.css';

type FormData = {
  username: string;
  password: string;
  message: string;
};

const LoginForm = (props: any) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({} as FormData);
  const { loading, token } = props;

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
  return (
    <Box>
      <Box>
        <Typography variant="h4">
          <Box fontWeight={600} letterSpacing={3}>
            Sign in
          </Box>
        </Typography>
      </Box>
      <Container component="main" maxWidth="md">
        <CssBaseLine />
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justify="center"
          spacing={3}
        >
          <Grid item md={3}>
            <img src="#" alt="Viet Catholic JP" />
          </Grid>
          <Grid item md={9}>
            <Paper>
              <form onSubmit={handleSubmit}>
                <Box>
                  <TextField
                    variant="outlined"
                    margin="none"
                    value={values.username}
                    fullWidth
                    id="username"
                    label="User name"
                    name="username"
                    onChange={handleChange}
                    helperText={errors.username}
                    error={errors.username ? true : false}
                  />
                  <TextField
                    variant="outlined"
                    margin="none"
                    value={values.password}
                    fullWidth
                    id="password"
                    label="Passowrd"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                  />
                  {errors && (
                    <Typography variant="body2">{errors.message}</Typography>
                  )}
                  <Grid container>
                    <Grid item sm={6} md={6}>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                    </Grid>
                    <Grid item sm={6} md={6}>
                      <Link to="#">Forgot password?</Link>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    Login
                    {loading && (
                      <CircularProgress size={30} color="secondary" />
                    )}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
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
