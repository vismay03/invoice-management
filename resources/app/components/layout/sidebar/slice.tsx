import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
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

export const { toggle } = slice.actions;

export default slice.reducer;
