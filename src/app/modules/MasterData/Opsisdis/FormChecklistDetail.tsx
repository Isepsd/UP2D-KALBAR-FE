import TopBarLoader from '@app/components/Loader/TopBarLoader';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ReactTable from '@app/components/ReactTable';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { deleteByPath } from '@app/services/main.service';
import { addNotification } from '@app/store/notification/notification.action';
import axios from 'axios';
import React, { FC, useEffect, useMemo, useState } from 'react'
import Pagination from '@app/components/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import { Button, Card, Dropdown } from 'react-bootstrap';
import ModalData from '@app/components/Modals/ModalData';
import FormChecklistDetailModal from './FormChecklistDetailModal';
import { API_PATH } from '@app/services/_path.service';
import { FORM_CHECKLIST_DETAIL_COLUMN } from '@app/configs/react-table/master-opsisdis.columns.config';

type Props = {
  itemSelected?: any,
  onSelectItem?: any,
};

const FormChecklistDetail: FC<Props> = ({ itemSelected, onSelectItem }) => {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const path = API_PATH().master.opsisdis.pm.ref_pm_detail
  const [loading, setLoading] = useState<boolean>();

  const [pagination, setPagination] = useState({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: `Delete this detail tugas`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });

  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Detail Tugas`,
  });


  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [respData, setRespData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const label = "Detail Tugas"
  const [columns] = useState<any>(FORM_CHECKLIST_DETAIL_COLUMN());

  const dataTable = useMemo(() => data, [data]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: pagination.currentPage + 1,
        limit: pagination.perPage,
        id_ref_pm: itemSelected?.id_ref_pm ? itemSelected?.id_ref_pm : "0",
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results.map((d: any, i: number) => {
          d.id = d.id_ref_pm_detail;
          d.number = pagination.currentPage * pagination.perPage + (i + 1);
          return d;
        });
        setRespData(data);


        setPagination((prevState) => ({
          ...prevState,
          pageCount: Math.ceil(
            total / pagination?.perPage
          ),
          totalData: total,
        }));

        // if (type == 'kategori') onSelectItem(jenisAset || data[0])
      } else {
        setRespData([]);
        setPagination((prevState) => ({
          ...prevState,
          pageCount: 1,
          totalData: 0,
        }));
      }

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  /** DELETE HANDLING */
  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteByPath(
        path,
        dataSelected.id,
        source.token
      );
      dispatchNotification(`Berhasil hapus ${label}`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Berhasil hapus ${label}`, 'danger');
    }
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {

    if (itemSelected?.id_ref_pm || pagination?.currentPage) {
      getAllData();
    }
  }, [pagination?.currentPage, itemSelected?.id_ref_pm]);

  const callbackModalConfirm = (approved = false) => approved && deleteData();

  /**
   * ! Pagination
   * @param e
   */
  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** ADD HANDLING */
  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };


  const handleEdit = (item: any) => {
    setDataSelected(item)
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  useEffect(() => {
    let dataTableValue: any = [];
    respData?.forEach((item: any) => {
      dataTableValue.push({
        number: item.number,
        nama: item?.nama,
        acuan: item?.nilai_acuan,
        satuan: item?.satuan,
        jenis: item?.jenis,
        tipe: item?.tipe_data,
        nilai_pemeriksaan: item?.nilai_pemeriksaan,
        no_urut: item?.no_urut,
        action: (
          <div className='d-flex align-items-center'>

            <Button onClick={() => setDataSelected(item)} variant='link' size='sm'>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </Button>
            <Dropdown className='hide-toogle hide-focus'>
              <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body'>
                <i className='fa-solid fa-ellipsis font-weight-bold'></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleDelete(item)}
                  className='text-danger-hover'
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )
      });
    });

    setData(dataTableValue)
  }, [respData]);


  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  useEffect(() => {
    onSelectItem(dataSelected)
  }, [dataSelected])

  return (
    <>
      <Card>
        <Card.Header className='font-weight-600 align-items-center d-flex'>
          <div className='w-100'>Tugas Detail {itemSelected?.nama}</div>
          <div className='ms-auto d-flex align-items-center'>
            <Button onClick={() => handleAddClick()} variant='primary' size='sm'>
              <i className='fa-solid fa-plus'></i>
            </Button>
            <Button variant='info' size='sm' className='ms-2'>
              <i className='fa-solid fa-arrows-rotate'></i>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <TopBarLoader isLoading={loading} />
          <ReactTable
            columns={columns}
            data={dataTable}
            containerClass='mb-3 table table-responsive'
          />
          <Pagination
            pagination={pagination}
            handlePaginationClick={handlePaginationClick}
          />
          <ModalConfirm
            modalConfirmProps={modalConfirm}
            callbackModalConfirm={callbackModalConfirm}
          />

          <ModalData modalProps={modal}>
            <FormChecklistDetailModal
              modal={modal}
              id_ref_pm={itemSelected?.id_ref_pm}
              dataSelected={dataSelected} />
          </ModalData>
        </Card.Body>
      </Card>
    </>
  )
}

export default FormChecklistDetail