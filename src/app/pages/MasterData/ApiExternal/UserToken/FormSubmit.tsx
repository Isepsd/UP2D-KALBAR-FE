import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { setCallbackForm } from '@app/store/reducers/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { postByPath } from '@app/services/main.service';
// import Select from 'react-select';
// import { ReactSelectStyle } from '@app/configs/react-select.config';
// import { SELECT_UFR } from '@app/configs/select-options.config';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import FormData from '@app/modules/Form/FormData';
import { API_PATH } from '@app/services/_path.service';
import { DokumentasiUFRField } from '@app/interface/dokumentasi-ufr.interface';
// import ButtonSubmit from '@app/components/Button/ButtonSubmit';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { useDispatch,useSelector } from 'react-redux';
import Button from '@app/components/Button/Button';

export default function FormSubmit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();
  const [action, setAction] = useState<string>();
  const { closeModal } = useSelector((state: any) => state.ui);
  // const [dataSelected, setDataSelected] = useState<any>();
  const { list } = useSelector(
    (state: any) => state.ufr
  );
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().typeError("UFR tidak valid").required("UFR belum dipilih"),
    id_module: Yup.number().typeError("Belum Pilih Data").required("Belum Pilih Data"),
  });

  const [formModel] = useState<any>({});
  // const optionData: any = SELECT_UFR()
  const {
    // handleSubmit,
    setValue,
    setError,
    // control,
    // formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  // const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */

  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: `Akses`,
    subDescriotion: `Simpan Akses?`,
    textApproved: 'Simpan',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });



  const onSubmitForm = (data: any) => {
    setDataParams(data);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };


  const Save = async (id: any) => {
    try {
      
      await postByPath(
        API_PATH().master.external.extmodule,
        dataParams.id,
        source.token
      );
   
      dispatchNotification(`Sukses`, 'success');
      dispatch(setCallbackForm(id));
    } catch (err: any) {
      dispatchNotification('Gagal', 'danger');
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  // useEffect(() => {
  //   let id: any = []
  //   list?.map((item: any) => {
  //     id.push(item?.id_module)
  //   })
  //   setValue("id_module",id)
  // }, [list])


  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined);
    }
  }, [closeModal]);


  const callbackModalConfirm = (approved = null) => {
    if (approved) {
      Save(dataParams?.id_token);
    }
  };

  return (
    <>
      {list && list?.length > 0 &&
        <FormData
          setError={setError}
          setValue={setValue}
          dataParams={dataParams}
          fields={DokumentasiUFRField}
          path={`${API_PATH().master.external.extmodule}`}
          onLoading={setLoading}
          customLabel={'hide'}
          isModal={true}
        // batch={true}
        >
          
            {/* <div className="mt-4">
              <ButtonSubmit className="justify-content-start" loading={loading} onClickReset={() => onSubmitForm(null)} />

            </div> */}
          <Form.Group className='mt-4'>
          <Button
          variant='primary ms-1'
          onClick={onSubmitForm}
          disabled={loading}
           >
          Simpan Perubahan
           </Button>
            <ButtonCancel />
            </Form.Group>

          <ModalConfirm
          modalConfirmProps={modalConfirm}
          callbackModalConfirm={callbackModalConfirm}
           />
         
        </FormData>
        
        
      }
    </>
  );
}
