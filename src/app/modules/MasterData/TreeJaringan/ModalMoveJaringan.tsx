import TableStatic from '@app/modules/Table/TableStatic';
import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { TREE_JARINGAN } from '@app/configs/react-table/master-jaringan.columns.config';

import TreeJaringan from './TreeJaringan';
import { get } from 'lodash';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import axios from 'axios';
import { getAllByPath, putByPath } from '@app/services/main.service';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { useDispatch } from 'react-redux';
import { API_PATH } from '@app/services/_path.service';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';

type IModalMoveJaringan = {
  modalProps: any;
  callbackData:any;
  garduIndukSelected?: any;
};

const ModalMoveJaringan: FC<IModalMoveJaringan> = ({ modalProps, callbackData, garduIndukSelected }) => {
  const source = axios.CancelToken.source();
  const dispatch = useDispatch()

  const [modal, setModal] = useState<any>({ show: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSelectedRow, setDataSelectedRow] = useState<any>([]);
  const [dataSelectedRowTarget, setDataSelectedRowTarget] = useState<any>([]);
  const [dataSelectedColumnsConfig, setDataSelectedColumnsConfig] = useState<any>([]);
  const [garduIndukOptions, setGarduIndukOptions] = useState<any>([]);
  const [garduInduk, setGarduInduk] = useState<any>();

  useEffect(() => {
    if(modalProps?.show) getAllDataGarduInduk();

    setModal({ ...modalProps });
  }, [modalProps]);

  useEffect(() => {
    if(garduIndukSelected) setGarduInduk(garduIndukSelected);
  }, [garduIndukSelected])
  

  const modalDecline = () => {
    setModal({ ...modal, show: false });
  };

  const handleSelectedRows = (selected: any) => {
    setDataSelectedRowTarget(selected);
  };

  const getAllDataGarduInduk = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: '-1',
        limit: 100,
        id_ref_jenis_lokasi: 4,
      };

      const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);
      const { results } = req;

      let data: any = results.map((d: any) => {
        return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
      });
      setGarduIndukOptions(data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  const handleMoveAset = async () => {
    const params = {
      "id_ref_lokasi": get(dataSelectedRow, '0.id'),
      "id_parent_lokasi": get(dataSelectedRowTarget, '0.id')
    }

    if(!params.id_ref_lokasi && !params?.id_parent_lokasi){return false}

    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
 
    try {
      const params = {
        "id_ref_lokasi": get(dataSelectedRow, '0.id'),
        "id_parent_lokasi": get(dataSelectedRowTarget, '0.id')
      }

      putByPath(`${API_PATH().master.jaringan.tree_jaringan}/update-data-parent`, params, undefined, source.token)
      setLoading(false);
      dispatchNotification(
        `Sukses memindahkan data`,
        'success'
      );
      modalDecline()
      callbackData(params)
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(
        `Gagal  memindahkan data`,
        'danger'
      );
    }
  };

  const changeGarduIndukOptions = (selected: any) => {
    setGarduInduk(selected);
  };


  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };


  useEffect(() => {
    if (modalProps?.selected) {
      setDataSelectedColumnsConfig(
        (TREE_JARINGAN() as any)
          .map((col: any) => {
            return { ...col, disableFilters: true };
          })
          .filter((f: any) => f?.accessor != 'action')
      );
      setDataSelectedRow([
        {
          id: modalProps?.selected?.id_ref_lokasi,
          nama_lokasi: modalProps?.selected?.nama_lokasi,
          id_ref_jenis_lokasi: modalProps?.selected?.nama_jenis_lokasi,
          kode_lokasi: modalProps?.selected?.kode_lokasi,
          no_tiang: modalProps?.selected?.no_tiang,
          alamat: modalProps?.selected?.alamat,
          coverage: modalProps?.selected?.alamat,
        },
      ]);
    }
  }, [modalProps?.selected]);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Modal
        keyboard={false}
        centered
        show={modal.show}
        size='lg'
        onHide={modalDecline}
      >
        <Modal.Header>
          <h5 className='fw-bold'>Manuver Aset</h5>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <h5>Aset Yang Akan Dipindahkan </h5>
          <hr />
          <TableStatic
            columnsConfig={dataSelectedColumnsConfig}
            rowsData={dataSelectedRow}
          ></TableStatic>
          <h5 className='mt-4'>Gardu Induk</h5>
          <div style={{ width: '300px' }}>
            <Select
              placeholder='Pilih Gardu Induk'
              styles={ReactSelectStyle}
              value={garduInduk}
              onChange={(val: any) => changeGarduIndukOptions(val)}
              options={garduIndukOptions}
            />
          </div>
          <h5 className='mt-4'>Aset Tujuan</h5>
          <hr />

          <TreeJaringan
            move={false}
            rowSelect={true}
            rowSelectType={'radio'}
            onCheckedRows={handleSelectedRows}
            idRefLokasi={garduInduk?.value || ''}
          ></TreeJaringan>

          <div className='d-flex gap-2 mt-3'>
            <button
              className='btn btn-primary font-weight-600 m-0 px-5'
              disabled={
                get(dataSelectedRowTarget, '0.id') == undefined ||
                get(dataSelectedRow, '0.id') ==
                  get(dataSelectedRowTarget, '0.id')
              }
              onClick={handleMoveAset}
            >
              Pindahkan
            </button>
            <button
              className='btn font-weight-600 m-0 px-5'
              onClick={modalDecline}
            >
              Batal
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalMoveJaringan;
