import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Initial state
const initialState = {
    token: localStorage.getItem('token') || null,
    tokenExpiry: localStorage.getItem('tokenExpiry') || null,
    loading: false,
    error: null,
};

// Create slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            const { empId, role, token, tokenExpiry } = action.payload;

            state.loading = false;
            state.token = token;
            state.tokenExpiry = tokenExpiry;

            // Store essential info in localStorage
            localStorage.setItem('employeeId', empId);
            localStorage.setItem('role', role);
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiry', tokenExpiry);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.tokenExpiry = null;
            state.error = null;

            localStorage.removeItem('employeeId');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Axios interceptor for token handling
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const isTokenExpired = tokenExpiry && new Date().getTime() > Number(tokenExpiry);

        if (isTokenExpired) {
            // You might need access to `store` here to dispatch logout
            localStorage.clear();
            return Promise.reject({ message: 'Token expired' });
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Thunk to log in
export const loginUser = (userData, navigate) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post('http://localhost:5090/api/Auth/login', userData);
        const data = response.data.response;

        dispatch(loginSuccess(data));
        console.log(data);
        navigate('/dashboard');
    } catch (error) {
        dispatch(loginFailure(error.response?.data || 'Login failed'));
        navigate('/login');
    }
};

export default authSlice.reducer;
