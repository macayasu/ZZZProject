import * as ActionTypes from '../constant/ActionTypes';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import config from '../../../../config'
const isLogged = (bool) => {
    return {
        type: ActionTypes.IS_LOGGED,
        isLogged: bool
    }
};

const loginHasError = (bool) => {
    return {
        type: ActionTypes.LOGIN_HAS_ERROR,
        hasError: bool
    }
};

const loginIsLoading = (bool) => {
    return {
        type: ActionTypes.LOGIN_IS_LOADING,
        isLoading: bool
    }
};

const setAsyncStorage = () => {

};

const login = (username, password) => {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        if(!username || !password){
            dispatch(loginHasError(true))
            dispatch(loginIsLoading(false))

            return;
        }

        fetch(`${config.baseurl}/users/authenticate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        })
            .then((res) => res.json())
            .then(res => {
                dispatch(loginIsLoading(false))
                console.log(res);
                // if(res.connected){
                //     dispatch(loginHasError(false))
                //     dispatch(
                //         isLogged(
                //             AsyncStorage.setItem('token', res.token),
                //             Actions.homeScreen()
                //     ))}
            })
            .catch((e) => {
                // console.warn(e);
                dispatch(loginHasError(true));
            });
    }
};

const logout = () => {
    AsyncStorage.removeItem('token');
    Actions.Login();
    return {
        type: ActionTypes.LOGOUT
    }
};

export default {
    isLogged,
    loginHasError,
    loginIsLoading,
    login,
    logout
}