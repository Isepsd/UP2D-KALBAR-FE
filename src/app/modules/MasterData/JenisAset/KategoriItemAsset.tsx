import TopBarLoader from '@app/components/Loader/TopBarLoader';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ReactTable from '@app/components/ReactTable';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { deleteByPath } from '@app/services/main.service';
import { addNotification } from '@app/store/notification/notification.action';
import axios from 'axios';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Pagination from '@app/components/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import { useNavigate } from 'react-router-dom';
import { timeFormatAlt } from '@app/helper/time.helper';
import { Badge, Button, Card, Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { getItem } from '@app/helper/localstorage.helper';
import { debounce } from 'lodash';

type Props = {
  type: string,
  path: string,
  label: string,
  columnConfig: any,
  itemSelected?: any,
  onSelectItem?: any,
};

const KategoriItemAsset: FC<Props> = ({ type, path = 'master/aset/ref-aset-jenis', label = 'Jenis Aset', columnConfig, itemSelected, onSelectItem }) => {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const jenisAset = getItem('jenis_aset')

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
    description: `Delete this ${label}`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });
  const initFilters = { sort_by: 'id_user', sort_type: 'desc', keyword: '' };
  const [reqFilters, setReqFilters] = useState<any>(initFilters);


  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [respData, setRespData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();

  const columns = React.useMemo(() => columnConfig(), []);

  const dataTable = useMemo(() => data, [data]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: pagination.currentPage + 1,
        limit: pagination.perPage,
        id_ref_aset_jenis: itemSelected?.id,
        ...reqFilters,
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results.map((d: any, i: number) => {
          d.id = type == 'kategori' ? d?.id_ref_aset_jenis : d.id_ref_aset_ex_atr;
          d.nama = type == 'kategori' ? d?.nama_aset_jenis : d.nama;
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

        if(type == 'kategori') onSelectItem(jenisAset || data[0])
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

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleEdit = (item: any) => {
    type == 'kategori' ? navigate(`edit/${item?.id}`) : navigate(`edit-item/${item?.id}`);
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    getAllData();
  }, [pagination?.currentPage, reqFilters]);

  useEffect(() => {
    if(itemSelected?.id) getAllData();
  }, [itemSelected]);

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
      setReqFilters((prevState: any) => ({
        ...prevState,
        sortBy: sortBy[0]['id'],
        sortType: sortBy[0]['desc'] ? 'desc' : 'asc',
      }));
    }
  }, []);

  const handleSearchColumn = useCallback(({ filters }: any) => {
    const columnFilter: any = {}
    if(filters.length > 0){
      filters.map((x: any) => columnFilter[x.id] = x.value )
    }
    
    // setReqFilters((prevState: any) => ({
    //   ...prevState,
    //   ...columnFilter
    // }));
  }, []);

  /** SEARCH HANDLER AND DEBOUNCE */
  const searchHandler = (event: any) => {
    setReqFilters((prevState: any) => ({
      ...prevState,
      keyword: event.target.value ? event.target.value : null,
    }));
  };

  const debouncedSearchHandler = useCallback(debounce(searchHandler, 500), []);

  useEffect(() => {
    let dataTableValue: any = [];
    respData.forEach((item: any, index: number) => {
      dataTableValue.push({
        id: item?.id,
        nama: item?.nama,
        status: (
          <Badge bg={item?.status == 1 ? `success` : `secondary text-white`}>
            {item?.status == 1 ? `Active` : 'Inactive'}
          </Badge>
        ),
        satuan: item?.satuan,
        tgl_entri: timeFormatAlt(item?.tgl_entri),
        tgl_update: timeFormatAlt(item?.tgl_update),

        action: (
          <div className='d-flex align-items-center'>
            {
              type == 'kategori' && (
                <Button onClick={()=> onSelectItem(item) } variant='link' size='sm'>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </Button>
              )
            }
            <Dropdown className='hide-toogle hide-focus'>
              <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
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
        ),
      });
    });

    setData(dataTableValue);
  }, [respData]);

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  return (
    <Card>
      <Card.Header className='font-weight-600 align-items-center d-flex'>
        <div className='w-100'>{label} { itemSelected?.nama }</div>
        <div className='ms-auto d-flex align-items-center'>
          <InputGroup size='sm'>
            <InputGroup.Text
              id='search-data'
              className='bg-transparent border-0 ps-0'
            >
              <i className='fa-solid fa-magnifying-glass fa-fw'></i>
            </InputGroup.Text>
            <FormControl
              onChange={debouncedSearchHandler}
              size='sm'
              className='search bg-transparent ps-0 border-0'
              placeholder='Search...'
              aria-label='Search...'
              aria-describedby='search-wsp'
            />
          </InputGroup>
          <Button onClick={()=> navigate(type == 'kategori' ? 'add' : 'add-item') } variant='primary' size='sm'>
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
          onSort={handleSort}
          onFilters={handleSearchColumn}
          containerClass='mb-3 table table-responsive'
        />
        <Pagination
          pagination={pagination}
          handlePaginationClick={handlePaginationClick}
          forced={false}
        />
        <ModalConfirm
          modalConfirmProps={modalConfirm}
          callbackModalConfirm={callbackModalConfirm}
        />
      </Card.Body>
    </Card>
  )
}

export default KategoriItemAsset