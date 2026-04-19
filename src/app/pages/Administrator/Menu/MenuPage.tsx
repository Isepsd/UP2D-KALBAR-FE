import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { JSONtoString, stringToJSON } from '@app/helper/data.helper';
import { initFlatMenu, initNestedMenu } from '@app/helper/menu.helper';
import AccordionMenuManagement from '@app/modules/Menu/AccordionMenuManagement';
import {
  deleteByPath,
  getAllByPath,
  postByPath,
  putByPath,
} from '@app/services/main.service';
import axios from 'axios';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { useDispatch } from 'react-redux';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { pick, size } from 'lodash';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import styled from 'styled-components';
import { setNavigation } from '@app/store/reducers/ui';
import { MenuField } from '@app/interface/administrator-menu.interface';
import { getObjectKeys } from '@app/helper/object.helper';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

const slugify = require('slugify');

export const InputChecklist = styled.input`
  height: 24px;
  border: none;
  box-sizing: border-box;
  color: var(--black-750);
  background: transparent;
  &:focus-visible {
    outline: none;
  }
`;

export default function MenuPage() {
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();

  const [nestedMenu, setNestedMenu] = useState([]);
  const [loading, setLoading] = useState<boolean>();
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [parentMenuOptions, setParentMenuOptions] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: 'Delete this Role',
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });

  /** DATA RESP */
  const [dataSelected, setDataSelected] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    display: Yup.string().required('Nama menu wajib diisi'),
    name: Yup.string().required('Alias wajib diisi'),
    icon: Yup.string().nullable(),
    path: Yup.string().nullable(), //required('Path url menu wajib diisi')
    privileges: Yup.array().of(
      Yup.object().shape({
        checked: Yup.bool(),
        priv: Yup.string(),
      })
    ),
  });

  const [formModel] = useState<any>({
    privileges: ['view', 'create', 'update', 'delete']?.map((item: any) => {
      return { priv: item, checked: true };
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    // setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchDisplay = useWatch({ control, name: 'display' });
  const watchIcon = useWatch({ control, name: 'icon' });
  const watchPrivileges = useWatch({ control, name: 'privileges' });

  const onSubmitForm = (data: any) => {
    const params = {
      ...data,
      divider: data?.divider ? data.divider : false,
      hidden: data?.hidden ? data.hidden : false,
      search: data?.search == true || data?.search == false ? data.search : true,
      privileges: data?.privileges
        ? JSONtoString(
          data?.privileges
            .filter((f: any) => f?.checked)
            .map((item: any) => {
              return item?.priv;
            })
        )
        : [],
    };

    upsertData(pick(params, getObjectKeys(MenuField)));
  };

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    try {
      const id = params.id;
      id
        ? await putByPath('menu', params, id, source.token)
        : await postByPath('menu', params, source.token);
      setLoadingForm(false);
      getAllDataMenu();

      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      dispatchNotification(
        `Sukses ${params.id ? 'mengubah' : 'membuat'} menu`,
        'success'
      );
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Gagal ${params.id ? 'mengubah' : 'membuat'} menu`,
        'danger'
      );
    }
  };

  /** INIT DATA EDIT */
  const initDataForm = (data: any) => {
    if (data) {
      Object.keys(data).map((field: any) => {
        setValue(field, data[field]);
      });
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
      const MENU = dataResults.map((d: any) => {
        return {
          ...d,
          idParent: d.idParent ? d.idParent : '',
          privileges: stringToJSON(d.privileges),
        };
      });

      const menus = initNestedMenu('', MENU, null);
      const optionsMenu = initFlatMenu(menus);
      const optionsMenuFormatted = optionsMenu?.map((item: any) => {
        return {
          value: item?.id,
          alias: item?.name,
          label: `${'--'.repeat(item?.index)} ${item?.display}`,
        };
      });
      setParentMenuOptions(optionsMenuFormatted);
      setNestedMenu(menus);
      dispatch(setNavigation(menus));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  /** DELETE DATA REQUEST */
  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteByPath('menu', dataSelected?.id, source.token);

      getAllDataMenu();
    } catch (err: any) {
      setLoading(false);
    }
  };

  /** HANDLE DELETE */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const callbackModalConfirm = (approved = false) => approved && deleteData();

  /** HANDLE EDT */
  const handleEdit = (menu: any) => {
    setDataSelected(menu);
    initDataForm({
      ...menu,
      privileges: menu?.privileges.map((item: any) => {
        return { priv: item, checked: true };
      }),
    });
  };

  /** MOVE UP MENU */
  const handleMoveUpDown = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      await putByPath('menu/update_menu_batch', params, '', source.token);
      getAllDataMenu();
      // dispatchNotification(`Sukses mengubah urutan menu`, 'success');
    } catch (err: any) {
      dispatchNotification(`Gagal mengubah urutan menu`, 'danger');
    }
  };

  /** HANDLE CLEAR FORM */
  const handleClearForm = () => {
    const formData = size(dataSelected) ? dataSelected : MenuField
    Object.keys(formData).map((field: any) => {
      if (field == 'privileges') {
        setValue(
          field,
          formData[field]?.map((item: any) => {
            return { priv: item, checked: true };
          })
        );
      } else {
        setValue(field, formData[field]);
      }
      clearErrors(field);
    });

    setDataSelected({});
  };

  /** CHANGE DISPLAY NAME */
  const handleChangeDisplayName = (display: string) => {
    const value = slugify(display, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    setValue('name', value);
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** HANDLE ADD NEW HAK AKSEES */
  const onKeyUpChecklist = (event: any) => {
    if (event.code == 'Enter') {
      const priv = [
        ...watchPrivileges,
        { priv: event.target.value, checked: false },
      ];
      setValue('privileges', priv);
    }
  };

  useEffect(() => {
    if (watchDisplay && dataSelected?.id == undefined) {
      handleChangeDisplayName(watchDisplay);
    }
  }, [watchDisplay]);

  useEffect(() => {
    getAllDataMenu();
    let roleAccess = ROLE_ACCESS("admin-user")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    return () => {
      setParentMenuOptions([]);
      setNestedMenu([]);
    };
  }, []);

  return (
    <>
      <TopBarLoader isLoading={loading || loadingForm} />

      <Row>
        <Col md='9'>
          {loading && nestedMenu.length == 0 && 'Loading...'}
          <AccordionMenuManagement
            menu={nestedMenu}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleMoveUp={handleMoveUpDown}
            handleMoveDown={handleMoveUpDown}
          />
        </Col>
        <Col md='3'>
          <div style={{ position: 'sticky', top: '6rem' }}>
            <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
              {dataSelected?.id == undefined && roleActions?.create && (
                <Button
                  variant={'primary'}
                  className='w-100 mb-3'
                  onClick={() => handleClearForm()}
                >
                  Tambah
                </Button>
              )}
              <Card>
                <Card.Header className='text-center py-2'>
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: `<i class='${watchIcon}'></i>`,
                    }}
                  ></h3>
                  <h5>{watchDisplay}</h5>
                </Card.Header>
                <PerfectScrollbar style={{ height: 'calc(100vh - 310px)' }}>
                  <Card.Body>
                    <Form.Group className='mb-3' controlId='display'>
                      <Form.Label>Display Menu</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Display Nama menu'
                        isInvalid={errors.display}
                        {...register('display')}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.display?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='name'>
                      <Form.Label>Alias Menu</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Alias menu'
                        isInvalid={errors.name}
                        {...register('name')}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='parent'>
                      <Form.Label>Parent Menu</Form.Label>
                      <Controller
                        control={control}
                        defaultValue={null}
                        name='idParent'
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            placeholder='Pilih parent menu'
                            styles={ReactSelectStyle}
                            classNamePrefix={`${errors.idParent ? 'is-invalid' : ''
                              }`}
                            inputRef={ref}
                            value={parentMenuOptions.filter(
                              (c: any) => c.value == value
                            )}
                            onChange={(val: any) => onChange(val?.value)}
                            options={parentMenuOptions}
                            isLoading={loading}
                          />
                        )}
                      />
                      {errors.idParent && (
                        <div className='invalid-feedback d-block'>
                          {errors.idParent?.message}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='path'>
                      <Form.Label>Path</Form.Label>
                      <Form.Control
                        type='path'
                        {...register('path')}
                        isInvalid={errors.path}
                        placeholder='/pathmenu/...'
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.path?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='icon'>
                      <Form.Label>
                        Icon
                        <a
                          className='badge badge-info ms-2'
                          href='https://fontawesome.com/search?o=r&m=free'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Dokumentasi
                        </a>
                      </Form.Label>
                      <InputGroup className='mb-3'>
                        {watchIcon && (
                          <InputGroup.Text
                            id='icon'
                            dangerouslySetInnerHTML={{
                              __html: `<i class='${watchIcon}'></i>`,
                            }}
                          ></InputGroup.Text>
                        )}
                        <FormControl
                          placeholder='Ex: fa-solid fa-house'
                          aria-label='fa-solid fa-house'
                          aria-describedby='icon'
                          {...register('icon')}
                          isInvalid={errors.icon}
                        />
                      </InputGroup>
                      <Form.Control.Feedback type='invalid'>
                        {errors?.icon?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row className='mb-3'>
                      <Form.Group as={Col}>
                        <Form.Label>Form Pencarian</Form.Label>
                        <div>
                          <Form.Check
                            {...register('search')}
                            inline
                            type='checkbox'
                            value='true'
                            label='Search'
                            disabled={!(roleActions?.update && roleActions?.create)}
                          />
                        </div>
                        <Form.Control.Feedback type='invalid'>
                          {errors?.search?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Form.Group className='mb-3' controlId='privileges'>
                      <Form.Label>Hak akses</Form.Label>
                      {watchPrivileges?.map((item: any, i: number) => (
                        <Form.Check
                          type='checkbox'
                          label={item?.priv}
                          {...register(`privileges.${i}.checked`)}
                          key={i}
                          disabled={!(roleActions?.update && roleActions?.create)}
                        />
                      ))}
                      {(roleActions?.update || roleActions?.create) &&

                        <div className='d-flex align-items-center'>
                          <span style={{ padding: '0 2px', width: '20px' }}>
                            <i className='fa-solid fa-plus'></i>
                          </span>
                          <InputChecklist
                            onKeyPress={onKeyUpChecklist}
                            placeholder='Klik enter menambah'
                          />
                        </div>

                      }
                    </Form.Group>
                  </Card.Body>
                </PerfectScrollbar>
                {(roleActions?.update || roleActions?.create) &&
                  <Card.Footer>
                    <ButtonGroup className='w-100'>
                      <Button
                        variant='primary'
                        type='submit'
                        disabled={loadingForm}
                      >
                        Simpan
                      </Button>
                      <Button
                        variant='secondary'
                        onClick={() => handleClearForm()}
                      >
                        Batal
                      </Button>
                    </ButtonGroup>
                  </Card.Footer>
                }

              </Card>
            </Form>
          </div>
        </Col>
      </Row>
      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
    </>
  );
}
