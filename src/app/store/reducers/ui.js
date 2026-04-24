import { createSlice } from '@reduxjs/toolkit';
import { calculateWindowSize } from '@app/helper/browser.helper';
import { getItem, setItem } from '@app/helper/localstorage.helper';
 
const initialState = {
  application: getItem('app'),
  themeMode: getItem('themeMode'),
  subSideNavActive: undefined,
  navigation: getItem('navigation'),
  activePage: undefined,
  activePaging: undefined,
  callbackForm: null,
  activeFilters: null,
  closeModal: null,
  loading: false,
  collapsedSidebar: getItem('collapsedSidebar'),
  screenSize: calculateWindowSize(window.innerWidth),
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      const loading = state.loading;
      state.loading = payload ? loading + 1 : loading == 0 ? 0 : loading - 1;
    },
    setActiveFilters: (state, { payload }) => {
      state.activeFilters = payload;
    },
    setActivePaging: (state, { payload }) => {
      state.activePaging = payload;
    },
    setCallbackForm: (state, { payload }) => {
      state.callbackForm = payload;
    },
    setCloseModal: (state, { payload }) => {
      state.closeModal = payload;
    },
    setActivePage: (state, { payload }) => {
      state.activePage = payload;
    },
    setApplication: (state, { payload }) => {
      setItem('app', payload);
      state.application = payload;
    },
    setNavigation: (state, { payload }) => {
      setItem('navigation', payload);
      state.navigation = payload;
    },
    setThemeMode: (state, { payload }) => {
      setItem('themeMode', payload);
      state.themeMode = payload;
    },
    setSubSideNavActive: (state, { payload }) => {
      state.subSideNavActive = payload;
    },
    toggleSidebarMenu: (state) => {
      const collapsed = state.collapsedSidebar == 'collapse' ? 'expand' : 'collapse'; 
      state.collapsedSidebar = collapsed;
      setItem('collapsedSidebar', collapsed);
    },
    setWindowSize: (state, { payload }) => {
      state.screenSize = payload;
    },
  },
});

export const {
  toggleSidebarMenu,
  setWindowSize,
  setThemeMode,
  setSubSideNavActive,
  setNavigation,
  setActivePage,
  setApplication,
  setActiveFilters,
  setCallbackForm,
  setCloseModal,
  setActivePaging,
  setLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
