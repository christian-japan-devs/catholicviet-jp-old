
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// Shared componentss
//Utils
import {
    ValidateEmail
} from '../../utils/formValidation';
import {
    AUTH_SET_EMAIL
    , AUTH_SET_ERROR_AT
} from '../../utils/actionTypes';
//App context
import { AppContext } from '../../contexts/AppContext';
//Auth actions
import { useAuth } from '../../hooks/authAction';

export type Props = {
    hiden: boolean;
};


/**
 * Function: ResetPasswordRequest
 * Description:
 * TODO: check if token is still valid no need to send email.
 * Input:
 * 1) AuthDispatch
 * 2) Data
 * Output:
 */
export const PersonalInforTab = () => {
    const { state, dispatch } = React.useContext(AppContext);
    const { AuthRequestPassword } = useAuth();

    //Handle Submit change
    const handleOnSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
    };

    //Handle form input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'email': {
                return;
            }
        }
    };

    const handleOnClear = () => {
        dispatch({
            type: AUTH_SET_EMAIL,
            payload: "",
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
        </Container>
    );
};