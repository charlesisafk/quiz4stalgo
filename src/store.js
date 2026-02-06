import { configureStore } from "@reduxjs/toolkit"; 
import { projectListReducer, projectDetailsReducer, projectCreateReducer } from "./reducers/projectReducers";
import { taskCreateReducer, taskListReducer } from "./reducers/taskReducers";
import { userLoginReducer, userCreateReducer, userListReducer } from "./reducers/userReducers";

const reducer = {
    userLogin: userLoginReducer,
    projectList: projectListReducer,
    projectDetails: projectDetailsReducer,
    projectCreate: projectCreateReducer,
    taskCreate: taskCreateReducer,
    taskList: taskListReducer,
    userCreate: userCreateReducer,
    userList: userListReducer,
};

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
});

export default store;