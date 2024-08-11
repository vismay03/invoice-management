import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isMinimized: false,
    },
    reducers: {
        toggle: (state) => {
            state.isMinimized = !state.isMinimized;
        },
    },
});

export const { toggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
