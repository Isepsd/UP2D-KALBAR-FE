import TopBarLoader from '@app/components/Loader/TopBarLoader';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ReactTable from '@app/components/ReactTable';
import { MASTER_PEGAWAI } from '@app/configs/react-table/master-pegawai.columns.config';
import { useApp } from '@app/context/AppContext';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { deleteByPath, getAllByPath } from '@app/services/main.service';
import { addNotification } from '@app/store/notification/notification.action';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Pagination from '@app/components/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Dropdown } from 'react-bootstrap';
import { IPegawai } from '@app/interface/pegawai.interface';
import { timeFormatAlt } from '@app/helper/time.helper';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function VendorPage() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const path = "master/vendor"
  const label = "Vendor "
  const { searchValue } = useApp();
  const [loading, setLoading] = useState<boolean>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [dataColumns, setDataColumns] = useState<any>([]);
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
    description: `Hapus data ${label}`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });
  const initFilters = { sort_by: 'nama', sort_type: 'asc' };
  const [filters, setFilters] = useState<any>(initFilters);

  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [respData, setRespData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();

  const columns = React.useMemo(() => MASTER_PEGAWAI(), []);

  const dataTable = useMemo(() => data, [data]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        ...filters,
        page: pagination.currentPage + 1,
        limit: pagination.perPage,
        keyword: searchValue,
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results.map((d: any, i: number) => {
          d.id = d?.id_ref_aset_kondisi
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
      dispatchNotification(`Success delete ${label}`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Failed delete ${label}`, 'danger');
    }
  };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleEdit = (item: any) => {
    navigate(`edit/${item?.id}`);
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    getAllData();
  }, [pagination?.currentPage, searchValue]);

  useEffect(() => {
    let dataTableValue: any = [];
    respData.forEach((item: IPegawai, index: number) => {
      dataTableValue.push({
        id: item?.id,
        nama: item?.nama,
        status: (
          <Badge bg={item?.status == 1 ? `success` : `secondary text-white`}>
            {item?.status}
          </Badge>
        ),
        tgl_entri: timeFormatAlt(item?.tgl_entri),
        tgl_update: timeFormatAlt(item?.tgl_update),

        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {roleActions?.updatem &&
                <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
              }
              {roleActions?.updatem &&
                <Dropdown.Item
                  onClick={() => handleDelete(item)}
                  className='text-danger-hover'
                >
                  Delete
                </Dropdown.Item>
              }

            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setData(dataTableValue);
  }, [respData]);

  useEffect(() => {
    setFilters((prevState: any) => ({
      ...prevState,
      keyword: searchValue,
    }));
  }, [searchValue])

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

  const handleSort = useCallback(({ sortBy }: any) => {
    if (sortBy.length > 0) {
      setFilters((prevState: any) => ({
        ...prevState,
        sortBy: sortBy[0]['id'],
        sortType: sortBy[0]['desc'] ? 'desc' : 'asc',
      }));
    }
  }, []);

  const handleSearchColumn = useCallback(({ filters }: any) => {
    setFilters((prevState: any) => ({
      ...prevState,
      filters: filters,
    }));
  }, []);

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);

    let roleAccess = ROLE_ACCESS("admin-user")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    if (!roleAct?.delete && !roleAct?.update) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <TopBarLoader isLoading={loading} />

      <TableDataListAction>
        {/* <UserFilter /> */}
      </TableDataListAction>

      <ReactTable
        columns={dataColumns}
        data={dataTable}
        onSort={handleSort}
        onFilters={handleSearchColumn}
        containerClass='my-3 table table-responsive'
      />
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
      />
      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
    </>
  )
}
