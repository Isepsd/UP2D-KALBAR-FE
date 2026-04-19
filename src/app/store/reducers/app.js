import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exportData: null,
  reloadData: null,
  generateData: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    exportingData: (state, { payload }) => {
      state.exportData = payload;
    },
    generatingData: (state, { payload }) => {
      state.generateData = payload;
    },
    reloadingData: (state, { payload }) => {
      state.reloadData = payload;
    },
  },
});

export const { exportingData, reloadingData,generatingData } = appSlice.actions;
export default appSlice.reducer;
