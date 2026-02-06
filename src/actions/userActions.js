import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const { data } = await axios.post('/api/v1/users/login/', { username, password }, config);
        
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.get('/api/v1/users/', config);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createUser = (first_name, last_name, username, email, role, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_CREATE_REQUEST });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.post(`/api/v1/users/create/`, {first_name, last_name, username, email, role, password}, config);
        dispatch({ type: USER_CREATE_SUCCESS, payload: data });
    }
        catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }   
};