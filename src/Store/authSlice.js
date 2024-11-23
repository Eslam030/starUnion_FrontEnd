// Store The token and username to use it in other components
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        spacialEventPassed: false,
        IsJoinUsSelector: false,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.username = action.payload.username;
        },
        clearAuthToken: (state) => {
            state.username = null;
        },
        setSpacialEventPassed: (state, action) => {
            state.spacialEventPassed = action.payload;
        },
        setIsJoinUs: (state, action) => {
            state.IsJoinUsSelector = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuthToken, clearAuthToken, setSpacialEventPassed, setIsJoinUs } = authSlice.actions;

export default authSlice.reducer;


