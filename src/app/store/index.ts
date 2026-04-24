import { createStore, combineReducers } from 'redux';

import notificationReducer from './notification/notification.reducer';

import { appSlice } from '@app/store/reducers/app';
import { authSlice } from '@app/store/reducers/auth';
import { uiSlice } from '@app/store/reducers/ui';
import { ufrSlice } from '@app/store/reducers/ufr';

const reducers = combineReducers({
  notifications: notificationReducer,
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  ufr: ufrSlice.reducer,
  app: appSlice.reducer
});

export default createStore(reducers);
