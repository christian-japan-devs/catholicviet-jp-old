import { useAuth } from '../../hooks/useAuth';
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


interface LoginForm {
    hide?: () => void;
}


const LoginForm: React.FC<LoginForm> = ({ hide }) => {
    const { login } = useAuth();
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState(null);

    const handleOnSubmit = async (evt:any) => {
        evt.preventDefault();
        setLoading(true);
        const { username, password } = values;
        const { data , dataError } = await login(username, password);
        setLoading(false);
        if (dataError?.error) {
            setErrors(dataError.error);
        } else if (data && hide) {
            setErrors(null);
            hide();
        }
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
                            <form onSubmit={handleOnSubmit}>
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