import axios from 'axios';
import { pick, replace } from 'lodash';
import store from '@store/index';
import { getRefreshToken } from './token.service';
import { refreshToken, logoutUser } from '@app/store/reducers/auth';
import { getItem, setItem } from '@app/helper/localstorage.helper';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';

const requestApi = (responseFields: any = null, baseUrl=undefined) => {
  let sourceRequest: any = {};

  // console.log(JSON.stringify(credentials));
  /** CREATE AXIOS INSTANCE */
  const axiosInstance = axios.create({
    baseURL: baseUrl ? baseUrl : process.env.API_BASE_URL,
  });

  /** HANDLE AXIOS REQUEST */
  axiosInstance.interceptors.request.use(async (config: any) => {
    const { credentials } = store.getState().auth;

    if (credentials?.access) {
      config.headers.Authorization = `Bearer ${credentials.access}`;
    }

    return config;
  });

  axiosInstance.interceptors.request.use((request: any) => {
    // // If the application exists cancel
    if (sourceRequest[request.url]) {
      sourceRequest[request.url].cancel('Automatic cancellation');
    }

    // Store or update application token
    // const axiosSource = axios.CancelToken.source();
    // sourceRequest[request.url] = { cancel: axiosSource.cancel };
    // request.cancelToken = axiosSource.token;

    return request;
  });

  /** HANDLE AXIOS RESPONSE */
  axiosInstance.interceptors.response.use(
    (resp) => {
      if (responseFields) return pick(resp, responseFields);
      return resp?.data;
    },
    async (error) => {
      const originalConfig = error.config;

      if (
        originalConfig?.url !== process.env.API_MAIN_SERVICE + '/auth/login' &&
        error.response
      ) {
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          const refresh_token = getRefreshToken();
          const totalRequestRefresh = getItem('g-refresh');
          const { credentials } = store.getState().auth;

          setItem(
            'g-refresh',
            totalRequestRefresh ? parseInt(totalRequestRefresh) + 1 : 0
          );

          if (totalRequestRefresh > 10) {
            store.dispatch(logoutUser());
            localStorage.clear();
            window.location.href = '/';
          }

          try {
            const rt: any = await axiosInstance.post(
              process.env.API_MAIN_SERVICE + '/auth/refresh-token', // '/api/v1' +
              {
                refresh: refresh_token,
              }
            );
            const newCredentials = { ...credentials, access: rt?.access };

            store.dispatch(refreshToken(newCredentials));

            setTimeout(() => {
              window.location.reload();
            }, 2000);

            setItem('g-refresh', 0);
            return axiosInstance(originalConfig);
          } catch (_error: any) {
            const match_refresh_token = getRefreshToken();
            if (
              refresh_token == match_refresh_token &&
              _error?.response?.status == 400
            ) {
              if (totalRequestRefresh > 10) {
                store.dispatch(logoutUser());
                window.location.href = '/';
              }
            } else if (_error?.response?.status == 401) {
              if (totalRequestRefresh > 10) {
                store.dispatch(logoutUser());
                localStorage.clear();
                window.location.reload();
              }
            }
            return Promise.reject(_error);
          }
        }else if(originalConfig?.method=='get' && error.response.status !== 401){
          const notification = notificationTemplate(error?.message, 'danger');
          const respMsg = error.response?.data?.message ? replace(error.response?.data?.message,'Page','Path'): ''
          const msg1 = error.message ? `${respMsg}`:''

          store.dispatch(addNotification({ ...notification, title:`Error ${error.response.status}`, message: [msg1], type: 'danger' }));
        }
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default requestApi;
