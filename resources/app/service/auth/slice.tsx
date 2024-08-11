import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))   || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('/api/login', credentials);
    return response.data;
});

export const register = createAsyncThunk('auth/register', async (userDetails) => {
    const response = await axios.post('/api/register', userDetails);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log(action)
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
