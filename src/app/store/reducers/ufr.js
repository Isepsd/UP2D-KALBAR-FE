import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    list: null,    
};

export const ufrSlice = createSlice({
    name: 'ufr',
    initialState,
    reducers: {
        setUFR: (state, {payload}) => {
            state.list = payload;
        },       
    }
});

export const {setUFR} = ufrSlice.actions;
export default ufrSlice.reducer;
