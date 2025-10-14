import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 10 },
    reducers: {
        increase: (state) => { state.value += 1 },
        decrease: (state) => { state.value -= 1 },
    }
});

export const { increase, decrease } = counterSlice.actions;
export default counterSlice.reducer;
