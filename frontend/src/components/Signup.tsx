import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
//Custom
import { AuthStyles } from './Styles';

export type SignUpFormData = {
    username: string;
    holyname: string;
    name: string;
    email: string;
    address: string;
    password1: string;
    password2: string;
    message: string;
};

export type AuthState = {
    token: string;
    error: string;
    loading: boolean;
};

type SignupProps = {
    state: AuthState;
    signUpFormData: SignUpFormData
    formDataValid: SignUpFormData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSignup: (event: React.FormEvent<HTMLFormElement>) => void;
}


const SignupForm: React.FC<SignupProps> = ({ state, signUpFormData, formDataValid, handleChange, handleSignup }) => {
    const classes = AuthStyles();
    return (
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
                            value={signUpFormData.username}
                            required
                            fullWidth
                            id='username'
                            label='Tên đăng nhập'
                            onChange={handleChange}
                            helperText={formDataValid.username}
                            error={!!formDataValid.username}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='holyname'
                            name='holyname'
                            variant='outlined'
                            value={signUpFormData.holyname}
                            required
                            fullWidth
                            id='holyname'
                            label='Tên Thánh'
                            onChange={handleChange}
                            helperText={formDataValid.holyname}
                            error={!!formDataValid.holyname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            variant='outlined'
                            value={signUpFormData.name}
                            required
                            fullWidth
                            id='name'
                            label='Họ và Tên'
                            onChange={handleChange}
                            helperText={formDataValid.name}
                            error={!!formDataValid.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='email'
                            name='email'
                            variant='outlined'
                            value={signUpFormData.email}
                            required
                            fullWidth
                            id='email'
                            label='Địa chỉ email'
                            helperText={formDataValid.email}
                            error={!!formDataValid.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='address'
                            name='address'
                            variant='outlined'
                            value={signUpFormData.address}
                            required
                            fullWidth
                            id='address'
                            label='Địa chỉ chỗ ở hiện tại'
                            helperText={formDataValid.address}
                            error={!!formDataValid.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='password1'
                            name='password1'
                            value={signUpFormData.password1}
                            onChange={handleChange}
                            variant='outlined'
                            required
                            fullWidth
                            id='password1'
                            label='Mật khẩu'
                            type="password"
                            helperText={formDataValid.password1}
                            error={!!formDataValid.password1}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='password2'
                            name='password2'
                            value={signUpFormData.password2}
                            onChange={handleChange}
                            variant='outlined'
                            required
                            fullWidth
                            id='password2'
                            label='Nhập lại mật khẩu'
                            helperText={formDataValid.password2}
                            error={!!formDataValid.password2}
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value='agreewith' color='primary' />}
                            label="Tôi đồng ý với các điều khoản của cộng đồng Công Giáo người Việt tại Nhật."
                        />
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    color='primary'
                    disabled={state.loading}
                    className={classes.submit}
                >
                    Đăng ký
              {state.loading && (
                        <CircularProgress size={30} color="secondary" />
                    )}
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;