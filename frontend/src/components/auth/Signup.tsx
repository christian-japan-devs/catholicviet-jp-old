import React,{ useState, useEffect } from 'react';
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
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { authSignup } from '../../store/actions/cauth';
import {FormData} from '../../store/types/auth';
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
    email: '',
    password1:'',
    password2:''
  });

  const [errors, setErrors] = useState({} as FormData);
  const { loading, token } = props;

  const formDataValid : FormData = {
    email: '',
    username: '',
    password1: '',
    password2: '',
    message: ''
  }

  const handleSignup = (e:any)=>{
    e.preventDefault();
    if(values.username.length <= 8) {         // check valid sign up information here
      formDataValid.username = 'Tên đăng nhập phải dài hơn 8 ký tự';
      setErrors( formDataValid );
    }else{
      const {username, email, password1, password2} = values;
      props.signup(username, email, password1, password2);
    }
  }

  const handleChange = (e:any) =>{
    setValues((values) => ({
      ...values, [e.target.name]: e.target.value,
    }))
  }

  if (token) {
    return (
      <Redirect to='/'/> //welcome popup show 
    )
  } else{
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>
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
                  error={errors.username ? true : false}
                  autoFocus
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
                  error={errors.email ? true : false}
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
                  error={errors.password1 ? true : false}
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
                  error={errors.password2 ? true : false}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='allowExtraEmails' color='primary'/>}
                  label="Tôi muốn nhận thông báo, và tin tức qua email."
                />
              </Grid>
            </Grid>
            <Button 
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
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
const mapStateToProps = (state:any) => ({
  loading : state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
});

// map actions to local props in this functional component

const mapActionsToProps = (dispatch: any) => {
  return {
    signup: (username: string, email: string, password1: string, password2: string) =>
      dispatch(authSignup(username, email,password1, password2)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
