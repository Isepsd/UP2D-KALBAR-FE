import requestApi from './api.service';

/**
 * AuthLoginService
 * @param params = {"username":"", "password":""}
 * @returns
 */
const AuthLoginService = ({ params = {}, cancelToken }: any) => {
  return requestApi().post(
    process.env.API_MAIN_SERVICE + '/auth/login',
    params,
    {
      cancelToken: cancelToken,
    }
  );
};

/**
 * AuthLoginService
 * @param params = {"id", "oldPassword":"", "newPassword":""}
 * @returns
 */
const ChangePasswordService = (params: any = {}, id: any, sourceToken: any) => {
  return requestApi().put(
    process.env.API_MAIN_SERVICE + '/auth/change-password/' + id,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

/**
 * Get user detail yg login
 * @returns
 */
const AuthUserDetailService = (cancelToken: any = undefined) => {
  return requestApi().post(
    process.env.API_MAIN_SERVICE + '/auth/details',
    {},
    {
      cancelToken: cancelToken,
    }
  );
};

export { AuthLoginService, AuthUserDetailService, ChangePasswordService };
