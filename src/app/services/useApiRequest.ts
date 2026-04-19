import { setLoading as setLoadingState } from '@app/store/reducers/ui';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import size from 'lodash/size';

import requestApi from './api.service';

interface IuseApiRequest {
  url: string;
  params?: any;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  loader?: boolean;
  noData?: boolean;
}

export default function useApiRequest<T>({
  url,
  params={},
  method,
  loader = true,
}: IuseApiRequest): {
  response: T | null | any;
  loading: boolean | true;
  noData: boolean | true;
  error: Error | null;
} {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const [response, setResponse] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [noData, setNodata] = React.useState<any>(false);

  React.useEffect(() => {
    if (url != undefined) {
      (async (): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 400));

        setResponse(null);
        setLoading(true);
        setNodata(false);

        try {
          if (loader) dispatch(setLoadingState(true));
          const res: any = await requestApi().request({
            url: url,
            method: method,
            data: params,
            cancelToken: source.token, // <-- IMPORTANT!
          });
          const data: any = res?.data || [];

          if (size(data) > 0) setNodata(false);
          if (size(data) == 0) setNodata(true);
          setResponse(res);
        } catch (error: any) {
          dispatch(setLoadingState(false));
          setError(error);
        } finally {
          if (loader) {
            dispatch(setLoadingState(false));
            setLoading(false);
          }
        }
      })();
    }

    return () => {
      source.cancel();
    };
  }, [params]);

  return { response, loading, noData, error };
}
