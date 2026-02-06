import {
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL, 
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,
} from '../constants/taskConstants';
import axios from 'axios';

export const createTask = (id, task_name, task_description, status, user_assigned, start_date, end_date) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_CREATE_REQUEST });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.post(`/api/v1/projects/${id}/task/create/`, {task_name, task_description, status, user_assigned, start_date, end_date}, config);
        dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const listTasks = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.get(`/api/v1/projects/${id}/tasks/`, config);
        dispatch({ type: TASK_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
