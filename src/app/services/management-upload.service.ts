import axios from 'axios';

import requestApi from './api.service';

const managementUploadFile = (
  url: string,
  sourceToken: any
) => {
  return requestApi(['headers', 'data']).request({
    url: `${process.env.API_MAIN_SERVICE}/${url}`,
    method: 'GET',
    responseType: 'blob',
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const getUploadTemp = (
  params: any,
  sourceToken: any
) => {
  return requestApi().request({
    url: `${process.env.API_MAIN_SERVICE}/master/management-upload/temp`,
    method: 'GET',
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const deleteUploadTemp = (
  params: any,
  idUser: any,
  sourceToken: any
) => {
  return requestApi().request({
    url: `${process.env.API_MAIN_SERVICE}/master/management-upload/temp/${idUser}`,
    method: 'DELETE',
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const uploadExcelTemp = (params: any, sourceToken: any) => {
  return requestApi().post(
    `${process.env.API_MAIN_SERVICE}/master/management-upload/temp`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const uploadFileExcelTemp = (url: any, params: any, sourceToken: any) => {
  return requestApi().post(
    `${process.env.API_MAIN_SERVICE}/${url}`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const downloadFileStatic = (
  url: string,
  sourceToken: any
) => {
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios.get(url, {
        responseType: 'blob',
        cancelToken: sourceToken
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });

  // return requestApi(['headers', 'data']).request({
  //   url: url,
  //   method: 'GET',
  //   responseType: 'blob',
  //   cancelToken: sourceToken, // <-- IMPORTANT!
  // });
};

export { managementUploadFile, getUploadTemp, deleteUploadTemp, uploadExcelTemp, uploadFileExcelTemp, downloadFileStatic }