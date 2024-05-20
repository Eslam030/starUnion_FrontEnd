import { createSlice } from '@reduxjs/toolkit';



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        username: null,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        clearAuthToken: (state) => {
            state.token = null;
            state.username = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuthToken, clearAuthToken } = authSlice.actions;

export default authSlice.reducer;


