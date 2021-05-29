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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import {useAuth} from '../hooks/useAuth';
import {authInitialState} from '../utils/reducer.auth';

interface LoginForm {
    hide?: () => void;
}


export const LoginForm: React.FC<LoginForm> = ({ hide }) => {
    const { login } = useAuth();
    const [ data, setData ] = React.useState(authInitialState);
    const [ loading, setLoading ] = React.useState(false);
    const [ errors, setErrors ] = React.useState(null);

    const handleOnSubmit = async (evt:any) => {
        evt.preventDefault();
        setLoading(true);
        setData({
            ...data,
            isError: false
        });
        const { username, password } = data;
        await login({username, password});
        setLoading(false);
        if (data && hide) {
            setErrors(null);
            hide();
        }
    };

    const handleChange = (event:any) => {
        setData((data) => ({
            ...data,
            [event.target.name]: event.target.value,
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
                            <form onSubmit={handleOnSubmit}>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        value={data.username}
                                        fullWidth
                                        id="username"
                                        label="User name"
                                        name="username"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        value={data.password}
                                        fullWidth
                                        id="password"
                                        label="Passowrd"
                                        name="password"
                                        type="password"
                                    />
                                    {errors && (
                                        <Typography variant="body2">{errors}</Typography>
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
}