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

const LoginForm = (props: any) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    error: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    setLoading(props.UI.loading);
  }, [props.UI]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    // client side validation here
    const { username, password } = values;
    props.login(username, password);
  };

  const handleChange = (e: any) => {
    e.persit();
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
                  helperText={errors.message}
                  error={errors.error ? true : false}
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
                  helperText={errors.message}
                  error={errors.error ? true : false}
                />
                {errors.message && (
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
                  {loading && <CircularProgress size={30} color="secondary" />}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

//This map the states to our props in this functional component
const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});

// This map actions to our props in this functional component
const mapActionsToProps = (dispatch: any) => {
  return {
    login: (username: string, passowrd: string) =>
      dispatch(authLogin(username, passowrd)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(LoginForm);
