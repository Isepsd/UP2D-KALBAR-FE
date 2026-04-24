import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    list: null,    
};

export const utkSlice = createSlice({
    nama: 'nama',
    initialState,
    reducers: {
        setUTK: (state, {payload}) => {
            state.list = payload;
        },       
    }
});

export const {setUTK} = utkSlice.actions;
export default utkSlice.reducer;
