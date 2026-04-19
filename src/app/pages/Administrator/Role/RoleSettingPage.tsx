import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { concat, union } from 'lodash';
import { v4 as uuid } from 'uuid';

import { MENU } from '@app/configs/menu.config';
import { initNestedMenu } from '@app/helper/menu.helper';

import { stringToJSON } from '@app/helper/data.helper';
import { Button } from 'react-bootstrap';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '@app/store/notification/notification.action';
import {
  getAllByPath,
  getByIdPath,
  putByPath,
} from '@app/services/main.service';
import { useNavigate, useParams } from 'react-router-dom';
import { setRoleAccess } from '@app/store/reducers/auth';
import { ActionFloating } from '@app/styled/action.styled';


export default function RoleSettingPage(): React.ReactElement {
  const source = axios.CancelToken.source();

  const { currentUser } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [menuPrivileges, setMenuPrivileges] = useState<any>([]); // setMenuPrivileges

  const [loading, setLoading] = useState<boolean>(false);
  const [dataModel, setDataModel] = useState<any>([]);
  const [privilegesModel, setPrivilegesModel] = useState<any>({});

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** TOGGLE CHECKLIST UNCHEKLIST PRIVILEGES */
  const toggleSetPrivilegesModel = (priv: any) => {
    let pm = JSON.parse(JSON.stringify(privilegesModel));
    if (pm[priv.name] && pm[priv.name].includes(priv.privileges)) {
      const index = pm[priv.name].indexOf(priv.privileges);
      if (index > -1) {
        pm[priv.name].splice(index, 1);
      }
    } else {
      pm = {
        ...pm,
        [priv.name]: union(pm[priv.name] ? pm[priv.name] : [], [
          priv.privileges,
        ]),
      };
    }

    setPrivilegesModel(pm);
  };

  function checkPriv(name: string, privileges_action: string) {
    return privilegesModel && privilegesModel[name]
      ? privilegesModel[name].includes(privileges_action)
      : false;
  }

  /** PUT / UPDATE PRIVILEGES REQUEST API */
  const saveChangePrivileges = async () => {
    setLoading(true);
    try {
      const params = {
        ...dataModel,
        privileges: JSON.stringify(privilegesModel),
      };

      await putByPath('roles', params, id, source.token);
      setLoading(false);
      dispatchNotification('Berhasil mengubah pengaturan hak akses', 'success');

      /** CHECKING IF SAME WITH CURRENT USER */
      if (id && currentUser?.roleId == id) {
        dispatch(setRoleAccess(params))
      }

    } catch (error) {
      setLoading(false);
    }
  };

  const resetForm = () => {
    // setDataModel([]);
    // setPrivilegesModel({});
    navigate(-1);
  };

  const checkAllPriv = (role: string, priv: any) => {
    const isSubset = priv.every(function (val: any) {
      return privilegesModel[role]
        ? privilegesModel[role].indexOf(val) >= 0
        : false;
    });

    return isSubset;
  };

  const checkAll = (e: any, role: string, priv: any) => {
    if (!e?.target?.checked) {
      setPrivilegesModel((prev: any) => ({
        ...prev,
        [role]: [],
      }));
    } else {
      setPrivilegesModel((prev: any) => ({
        ...prev,
        [role]: priv,
      }));
    }
  };

  /** GET DATA ALL MENU */
  const getAllDataMenu = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: -1,
        limit: -1,
      };

      const req: any = await getAllByPath('menu', params, source.token);

      const { results } = req;
      const dataResults = results ? results : [];
      const MENU_RESP = dataResults?.map((d: any) => {
        return {
          ...d,
          idParent: d.idParent ? d.idParent : '',
          privileges: stringToJSON(d.privileges),
        };
      });

      const menus = initNestedMenu('', concat(MENU_RESP, MENU), null);
      setMenuPrivileges(menus);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath('roles', id, source.token);
      const respData = req?.results;
      if (respData) {
        const jsonPriv = stringToJSON(respData.privileges);
        setDataModel(respData);
        if (jsonPriv && typeof jsonPriv === 'object') {
          setPrivilegesModel(jsonPriv);
        }
      }
    } catch {
      navigate('/');
    }
  };

  // console.log("privilegesModel", privilegesModel);
  // console.log("dataModel", dataModel);


  useEffect(() => {
    if (id) getDataById();
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** MOUNTING AND UNMOUNTING */
  useEffect(() => {
    getAllDataMenu();

    return () => {
      setMenuPrivileges([]);
      setDataModel([]);
      setPrivilegesModel([]);
      source.cancel('Component got unmounted');
    };
  }, []);

  return (
    <>
      <form>
        {menuPrivileges.map((item: any, i: number) => {
          return (
            <div className={i == 0 ? '' : 'mt-4'} key={i}>
              <div className='d-flex justify-content-between'>
                <h6 className='my-0 font-weight-bold'>
                  <i className={`${item?.icon}`}></i> {item.display}
                  {item?.privileges?.length > 1 && (
                    <div className='form-check form-check-inline'>
                      <input
                        id={`checkall-${i}`}
                        type='checkbox'
                        className='checkall-input form-check-input ms-3 me-2'
                        checked={checkAllPriv(item?.name, item?.privileges)}
                        onChange={(e) =>
                          checkAll(e, item?.name, item?.privileges)
                        }
                      />
                      <span className='fw-normal form-check-label'>All</span>
                    </div>
                  )}
                </h6>
                <div>
                  {item?.privileges &&
                    item?.privileges.map((itemp: any, ip: number) => (
                      <div className='form-check form-check-inline' key={ip}>
                        <input
                          id={`parent-${i}${ip}`}
                          type='checkbox'
                          className='form-check-input'
                          checked={checkPriv(item.name, itemp)}
                          onChange={(e: any) =>
                            toggleSetPrivilegesModel({
                              e,
                              name: item.name,
                              privileges: itemp,
                            })
                          }
                        />
                        <label
                          htmlFor={`parent-${i}${ip}`}
                          className='form-check-label'
                        >
                          {itemp}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
              <hr />
              <PrivilegesCheck
                items={item}
                checkAllPriv={checkAllPriv}
                checkAll={checkAll}
                checkPriv={checkPriv}
                toggleSetPrivilegesModel={toggleSetPrivilegesModel}
              ></PrivilegesCheck>
            </div>
          );
        })}
      </form>

      <ActionFloating className='d-flex gap-2'>
        <Button
          variant='primary ms-1'
          onClick={saveChangePrivileges}
          disabled={loading}
        >
          Simpan Perubahan
        </Button>
        {/* <Button variant='outline-secondary' type='reset' onClick={resetForm}> Batal </Button> */}
        <Button variant='outline-secondary' type='button' onClick={resetForm}> Batal </Button>
      </ActionFloating>
    </>
  );
}

const PrivilegesCheck = ({
  items,
  checkAllPriv,
  checkAll,
  checkPriv,
  toggleSetPrivilegesModel,
}: IPrivilegesCheck) => {
  return (
    <>
      {items?.children &&
        items?.children.map((item: any) => (
          <div className='media ms-4 mt-3' key={uuid()}>
            <div className='icon me-2 float-left'>
              <i
                className={`${item?.icon ? item.icon : 'fa-regular fa-circle-dot'}`}
              ></i>
            </div>
            <div className='media-body'>
              <div className='d-flex justify-content-between'>
                <h6 className='mt-0 font-weight-bold'>
                  {item?.display}
                  {item?.privileges?.length > 1 && (
                    <>
                      <div className='form-check form-check-inline'>
                        <input
                          id={`checkall-${item?.id}`}
                          type='checkbox'
                          className='checkall-input form-check-input ms-3 me-2'
                          checked={checkAllPriv(item?.name, item?.privileges)}
                          onChange={(e) =>
                            checkAll(e, item?.name, item?.privileges)
                          }
                        />
                        <span className='fw-normal form-check-label'>All</span>
                      </div>
                    </>
                  )}
                </h6>
                <div>
                  {item?.privileges &&
                    item?.privileges.map((itemp: any) => (
                      <div
                        className='form-check form-check-inline'
                        key={uuid()}
                      >
                        <input
                          id={`${item?.id}`}
                          type='checkbox'
                          className='form-check-input'
                          checked={checkPriv(item.name, itemp)}
                          onChange={(e: any) =>
                            toggleSetPrivilegesModel({
                              e,
                              name: item.name,
                              privileges: itemp,
                            })
                          }
                        />
                        <label
                          htmlFor={`${item?.id}`}
                          className='form-check-label'
                        >
                          {itemp}
                        </label>
                      </div>
                    ))}
                </div>
              </div>

              <PrivilegesCheck
                items={item}
                checkAllPriv={checkAllPriv}
                checkAll={checkAll}
                checkPriv={checkPriv}
                toggleSetPrivilegesModel={toggleSetPrivilegesModel}
              ></PrivilegesCheck>
            </div>
          </div>
        ))}
    </>
  );
};

interface IPrivilegesCheck {
  items: any;
  checkAllPriv: any;
  checkAll: any;
  checkPriv: any;
  toggleSetPrivilegesModel: any;
}
