import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { getByIdPath, postByPath, putByPath } from '@app/services/main.service';
import { getObjectKeys } from '@app/helper/object.helper';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { get, isBoolean, pick, pickBy } from 'lodash';
import { setCallbackForm } from '@app/store/reducers/ui';
import moment from 'moment';
import { objectToFormData } from '@app/helper/params.helper';

interface IFormData {
  children?: any;
  setError: any;
  setValue: any;
  dataParams: any;
  fields: any;
  path: any;
  onLoading?: any;
  customLabel?: any;
  overrideType?: any;
  selected?: any;
  isModal?: boolean;
  batch?: boolean;
  noUpdate?: boolean;
  ids?: any;
  onGetDataResult?: any;
  classContainer?: any;
  hideTitle?: boolean;
  redirectSubmitted?: boolean;
  idUserEntri?: boolean;
  isFormData?: boolean;
  isCreate?: boolean;
  link?: string;
}

function FormData({
  classContainer = 'ms-md-0',
  children,
  setError,
  setValue,
  dataParams,
  fields = {},
  path,
  onLoading,
  customLabel = '',
  overrideType,
  isModal = false,
  batch = false,
  noUpdate = true,
  ids = 'id',
  onGetDataResult,
  redirectSubmitted = true,
  hideTitle = false,
  isFormData = false,
  link
}: IFormData) {
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { activePage } = useSelector((state: any) => state.ui);
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const label = customLabel == 'state' ? activePage?.display : '';
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  /** INIT */
  useEffect(() => {
    if ((id || searchParams.get(ids)) && noUpdate) getDataById();
    else initDataForm();

    return () => {
      source.cancel('Request Canceled');
    };
  }, [id, searchParams.get(ids)]);

  useEffect(() => {
    if (dataParams) {
      const par: any = dataParams;

      if (isFormData) {
        upsertData(dataParams);
      } else {
        let p: any = par;
        Object.keys(par).map((field: any) => {
          const v: any = par[field];
          const fieldTypeValue = get(fields, field);
          const fieldType = typeof fieldTypeValue;
          const valueType = typeof par[field];
          let t =
            fieldType == 'number'
              ? valueType == 'boolean'
                ? v
                  ? 1
                  : 0
                : parseFloat(v ? v : 0)
              : v;
          t = fieldType == 'boolean' ? (t ? true : false) : t;
          t = fieldType == 'string' ? `${t}` : t;
          t =
            fieldType == 'object' && fieldTypeValue == null && v == '' ? null : t;
          p[field] = t;
        });
        upsertData(p);
      }
    }
  }, [dataParams]);

  useEffect(() => {
    if (onLoading) {
      onLoading(loadingForm);
    }
  }, [loadingForm]);

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    params = pickBy(params, (value) => value != 'null')

    const ID = id || searchParams.get(ids);
    // if (idUserEntri) {
    if (ID) {
      params.id_user_update = currentUser.id_user
      params.update_user = currentUser.id_user
    } else {
      params.id_user_entri = currentUser.id_user
      params.created_user = currentUser.id_user
    }
    // } else {
    //   params = {
    //     ...params[0],
    //     id_user_entri: currentUser.id_user
    //   };
    // }

    const paramsReq: any = isFormData ? objectToFormData(params) : params;
    const paramsRequest = batch ? [paramsReq] : paramsReq

    try {
      let resp: any;
      // if (noUpdate) {
      resp = ID
        ? await putByPath(path, paramsRequest, ID, source.token)
        : await postByPath(path, paramsRequest, source.token);
      // } else {
      //   if (isCreate) {
      //     resp = await postByPath(path, paramsReq, source.token);
      //   } else {
      //     resp = await postByPath(path, paramsRequest, source.token);
      //   }
      // }


      setLoadingForm(false);
      if (resp?.status == 200 || resp?.status == 201) {
        dispatchNotification(
          `Sukses ${ID ? 'mengubah data' : 'menambah data'} ${label}`,
          'success'
        );
      } else {
        dispatchNotification(resp?.message, 'danger');
      }

      /** IF REDIRECT / DISMISSED TRUE */
      if (redirectSubmitted) {
        if(link) {
          navigate(link);
        } else {
          if (!isModal) {
            navigate(-1);
          } else {
            searchParams.delete(ids);
            setSearchParams(searchParams);
          }
        }
      }
      dispatch(setCallbackForm(resp));
      if (!ID) initDataForm();
    } catch (err: any) {
      const errValidation = err?.response?.data?.results;
      if (errValidation && err?.response?.data?.status == 400) {
        errorValidationHandling(errValidation);
      } else {
        let message: any = err?.response?.data?.message ? err?.response?.data?.message : `${id || searchParams.get(ids) ? 'mengubah data' : 'menambah data'
          } ${label}`
        dispatchNotification(
          `Gagal ${message}`,
          'danger'
        );
      }
      setLoadingForm(false);
    }
  };

  /** GET EDIT DATA */
  const getDataById = async () => {
    setLoadingForm(true);
    try {
      const req: any = await getByIdPath(
        path,
        id || searchParams.get(ids),
        source.token
      );

      initDataForm(req?.results);

      if (onGetDataResult) {
        onGetDataResult(req?.results);
      }
      setLoadingForm(false);
    } catch {
      setLoadingForm(false);
    }
  };

  /** INIT DATA FORM EDIT OR NEW DATA */
  const initDataForm = (data: any = undefined) => {
    const valueData =
      (id || searchParams.get(ids)) && data
        ? pick(data, getObjectKeys(fields))
        : fields;
    Object.keys(valueData).map((field: any) => {
      const overrideCheck = get(overrideType, field);
      const valueOrigin = valueData[field];
      let v = valueOrigin;
      const boolValue = {
        'true': 1,
        'false': 0,
      }
      if (
        valueOrigin !== '' &&
        valueOrigin !== null &&
        valueOrigin !== undefined
      ) {
        const dateFormat = moment(valueOrigin);
        v = overrideCheck == 'string' ? `${(isBoolean(valueOrigin) ? get(boolValue, `${valueOrigin}`) : valueOrigin)}` : valueOrigin;

        v = overrideCheck == 'int' ? parseInt(valueOrigin) : v;
        v = overrideCheck == 'float' ? parseFloat(valueOrigin) : v;
        v = overrideCheck == 'date' ? dateFormat.format('YYYY-MM-DD') : v;
        v =
          overrideCheck == 'datetime'
            ? dateFormat.format('YYYY-MM-DD[T]HH:mm')
            : v;
        v =
          overrideCheck == 'datetimefull'
            ? dateFormat.format('YYYY-MM-DD[T]HH:mm:ss')
            : v;
      }

      setValue(field, v);
    });
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const errorValidationHandling = (formInvalid: any) => {
    if (
      typeof formInvalid == 'object' &&
      formInvalid instanceof Array == false
    ) {
      Object.entries(formInvalid).forEach(([key, value]) => {
        const valueArr: any = value;
        setError(key, {
          type: 'manual',
          message: valueArr.join(' '),
        });
      });
    }
  };

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />
      {isModal ? (
        children
      ) : (
        <Row className='animate__animated animate__fadeIn'>
          <div className='col-md-12'>
            <div className={`${classContainer}`}>
              {!hideTitle && (
                <>
                  <h5 className='py-1'>
                    <i className='fa-solid fa-circle-info'></i>{' '}
                    {id ? 'Update' : 'Tambah'} {label}
                  </h5>
                  <hr />
                </>
              )}
              <div className='row'>{children}</div>
            </div>
          </div>
        </Row>
      )}
    </>
  );
}

export default FormData;
