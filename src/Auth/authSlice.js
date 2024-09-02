// Store The token and username to use it in anther components
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.username = action.payload.username;
        },
        clearAuthToken: (state) => {
            state.username = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuthToken, clearAuthToken } = authSlice.actions;

export default authSlice.reducer;


