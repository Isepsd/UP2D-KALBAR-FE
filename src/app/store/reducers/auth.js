import {createSlice} from '@reduxjs/toolkit';
import { getItem, setItem } from "@app/helper/localstorage.helper";
import * as moment from "moment";

const me = getItem('me')

const initialState = {
    isUpdk: !!me?.id_unit_pembangkit,
    isLoggedIn: !!getItem('credentials'),
    credentials: getItem('credentials'),
    currentUser: me,
    activeMenu: getItem('activeMenu'),
    access: getItem('access'),
    roleUser: me?.user_role_id?.role_id_app,
    power: getItem('power')
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, {payload}) => {
            setItem('credentials', payload);
            state.isLoggedIn = true;
            state.credentials = payload;
        },
        setRoleAccess: (state, {payload}) => {
            setItem('access', payload);
            state.access = payload;
        },
        refreshToken: (state, {payload}) => {
            setItem('credentials', payload);
            state.isLoggedIn = true;
            state.credentials = payload;
        },
        setLoggedInUserDetail: (state, {payload}) => {
            setItem('me', payload);
            state.isUpdk = !!payload?.id_unit_pembangkit;
            state.currentUser = payload;
        },
        setUnitPembangkit: (state, {payload}) => {
            setItem('power', payload);
            state.power = payload;
        },
        setActiveMenu: (state, {payload}) => { 
            setItem('activeMenu', payload);
            state.activeMenu = payload;
        },
        setSessionLifetime: (_state, {payload}) => {
            setItem("accepted", {remember_me:payload.rememberMe, time:moment().valueOf()})
        },
        logoutUser: (state) => {
          localStorage.removeItem('credentials');
          localStorage.removeItem('accepted');
          localStorage.removeItem('power');
          localStorage.removeItem('me');
          localStorage.removeItem('layout');
          localStorage.removeItem('rgroup');
          localStorage.removeItem('navigation');
          localStorage.removeItem('g-refresh');
          localStorage.removeItem('themeMode');
          localStorage.removeItem('access');
          state.currentUser = {};
          state.activeMenu = {};
          state.isLoggedIn = false;
          state.credentials = null;
          state.accepted = null;
          state.power = null;
          state.me = null;
          state.roleUser = null;
        },
        loadUser: (state, {payload}) => {
            state.currentUser = payload;
        }
    }
});

export const {loginUser, setLoggedInUserDetail, logoutUser, loadUser, setSessionLifetime, setUnitPembangkit, refreshToken, setActiveMenu, setRoleAccess} = authSlice.actions;

export default authSlice.reducer;
