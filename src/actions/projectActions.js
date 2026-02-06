import {
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_FAIL,
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS,
    PROJECT_LIST_FAIL,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
} from '../constants/projectConstants';
import axios from 'axios';

export const createProject = (project_name, project_description, user_assigned, start_date, end_date) => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_CREATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                
            }
        };



        const { data } = await axios.post(`/api/v1/projects/create`, {project_name, project_description, user_assigned, start_date, end_date}, config);
        dispatch({ type: PROJECT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PROJECT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const listProjects = () => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_LIST_REQUEST });
        const { data } = await axios.get('/api/v1/projects/');
        dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PROJECT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getProjectDetails = (id, project_name, project_description, status, hours_consumed, user_assigned, start_date, end_date) => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/projects/${id}/`, {project_name, project_description, status, hours_consumed, user_assigned, start_date, end_date});
        dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PROJECT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};