import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { postByPath, putByPath } from '@app/services/main.service';
import { getObjectKeys } from '@app/helper/object.helper';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { get, pick, pickBy } from 'lodash';
import { setCallbackForm } from '@app/store/reducers/ui';
import moment from 'moment';

interface IFormDataModal {
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
  ids?: any;
  dataSelected?: any;
  onGetDataResult?: any;
  classContainer?: any;
  hideTitle?: boolean;
  redirectSubmitted?: boolean;
  modal?: any;
}

function FormDataModal({
  modal = false,
  classContainer = 'ms-md-0',
  children,
  setError,
  setValue,
  dataParams,
  fields = {},
  path,
  customLabel = '',
  overrideType,
  isModal = false,
  batch = false,
  ids = 'id',
  dataSelected,
  redirectSubmitted = true,
  hideTitle = false,
  onGetDataResult,
}: IFormDataModal) {
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
    // if (modal?.show) {
    initDataForm(dataSelected);
    // }
    return () => {
      source.cancel('Request Canceled');
    };
  }, [modal?.show, dataSelected]);

  useEffect(() => {

    if (dataParams) {
      let p: any = dataParams;
      Object.keys(dataParams).map((field: any) => {
        const v: any = dataParams[field];
        const fieldTypeValue = get(fields, field);
        const fieldType = typeof fieldTypeValue;
        const valueType = typeof dataParams[field];
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

      const apiParams = batch ? [p] : p;

      upsertData(apiParams);
    }
  }, [dataParams]);



  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    params = pickBy(params, (value) => value != 'null')

    const ID = (dataSelected) ? dataSelected[ids] : null;
    if (ID) {
      params.id_user_update = currentUser.id_user
    } else {
      params.id_user_entri = currentUser.id_user
    }

    try {
      const resp = ID
        ? await putByPath(path, params, ID, source.token)
        : await postByPath(path, params, source.token);

      setLoadingForm(false);
      dispatchNotification(
        `Sukses ${ID ? 'mengubah data' : 'menambah data'} ${label}`,
        'success'
      );

      /** IF REDIRECT / DISMISSED TRUE */
      if (onGetDataResult) {
        onGetDataResult(resp)
      } else
        if (redirectSubmitted) {
          if (!isModal) {
            navigate(-1);
          } else {
            searchParams.delete(ids);
            setSearchParams(searchParams);
          }
        }
      dispatch(setCallbackForm(resp));
      if (!ID) initDataForm();
    } catch (err: any) {
      const errValidation = err?.response?.data?.results;
      if (errValidation && err?.response?.data?.status == 400) {
        errorValidationHandling(errValidation);
      } else {
        dispatchNotification(
          `Gagal ${id || searchParams.get(ids) ? 'mengubah data' : 'menambah data'
          } ${label}`,
          'danger'
        );
      }
      setLoadingForm(false);
    }
  };

  /** GET EDIT DATA */

  /** INIT DATA FORM EDIT OR NEW DATA */
  const initDataForm = (data: any = undefined) => {
    // console.log("initDataForm f", fields);
    // console.log("initDataForm data", data);

    const valueData =
      data
        ? pick(data, getObjectKeys(fields))
        : fields;

    Object.keys(valueData).map((field: any) => {
      const overrideCheck = get(overrideType, field);
      const valueOrigin = valueData[field];
      let v = valueOrigin;
      if (
        valueOrigin != '' &&
        valueOrigin != null &&
        valueOrigin != undefined
      ) {
        const dateFormat = moment(valueOrigin);
        v = overrideCheck == 'string' ? `${valueOrigin}` : valueOrigin;
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
                    {/* {id ? 'Update' : 'Tambah'} {label} */}
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

export default FormDataModal;
