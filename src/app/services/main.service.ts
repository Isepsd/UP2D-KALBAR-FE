import requestApi from './api.service';

const getAllDownload = (
  path: any,
  params: any = {},
  sourceToken: any
) => {
  return requestApi(['headers', 'data']).request({
    url: `${process.env.API_MAIN_SERVICE}/${path}`,
    method: 'GET',
    responseType: 'blob',
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const getByIdPath = (path: any, id: any, sourceToken: any) => {
  return requestApi().request({
    url: `${process.env.API_MAIN_SERVICE}/${path}/${id}`,
    method: 'GET',
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};



const getAllByPath = (
  path = '',
  params: any = { page: 1, limit: 1000 },
  sourceToken: any,
  baseUrl:any  =undefined
) => {
  return requestApi(null, baseUrl).request({
    url: path.includes('http') ? path: `${process.env.API_MAIN_SERVICE}/${path}`,
    method: 'GET',
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const postByPath = (path = '', params: any, sourceToken: any) => {
  return requestApi().post(
    `${process.env.API_MAIN_SERVICE}/${path}`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const putByPath = (path = '', params: any, id: any, sourceToken: any) => {
  return requestApi().put(
    `${process.env.API_MAIN_SERVICE}/${path}${id ? '/' + id : ''}`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const deleteByPath = (path = '', id: any, sourceToken: any) => {
  return requestApi().request({
    url: `${process.env.API_MAIN_SERVICE}/${path}${id ? '/' + id : ''}`,
    method: 'DELETE',
    params: {},
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const putAsetExtAtrBatch = (path = '', params: any, sourceToken: any) => {
  return requestApi().put(
    `${process.env.API_MAIN_SERVICE}/${path}`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

export { getAllDownload, getAllByPath, getByIdPath, postByPath, putByPath, deleteByPath, putAsetExtAtrBatch };
