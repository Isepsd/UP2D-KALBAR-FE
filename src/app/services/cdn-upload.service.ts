import requestApi from './api.service';

const uploadImage = (params: any, sourceToken: any) => {
  return requestApi().post(
    `/upload/upload_image/`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const uploadFile = (params: any, sourceToken: any) => {
  return requestApi().post(
    `/upload/upload_file/`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

export { uploadImage, uploadFile };
