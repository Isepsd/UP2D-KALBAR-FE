import axios from 'axios';

const apiRequest = (
  path = '',
  method: any = 'GET', // GET / POST / PUT / DELETE ETC
  params: any = { page: 1, limit: 1000 },
  sourceToken: any,
) => {
  return axios.request({
    url: path,
    method: method,
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

export { apiRequest };
