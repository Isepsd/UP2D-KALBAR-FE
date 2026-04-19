import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FormControl, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { debounce } from 'lodash';

import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
import { STATION_OPTIONS_COLUMN } from '@app/configs/react-table/master-jaringan.columns.config';
import TopBarLoader from '../Loader/TopBarLoader';
import ReactTable from '@app/components/ReactTable';
import Pagination from '@app/components/Pagination/Pagination';

import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';

type Props = {
  modalProps: any;
  callbackModal : any;
};

const ModalGIGH: FC<Props> = ({
  modalProps,
  callbackModal,
}) => {
  const [modal, setModal] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: 'Delete this data',
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Yes',
    classApproved: 'primary',
    textDecline: 'No',
  });

  useEffect(() => {
    setModal({ ...modalProps });
  }, [modalProps]);

  const source = axios.CancelToken.source();
  const [columns] = useState<any>(STATION_OPTIONS_COLUMN());
  const [pagination, setPagination] = useState({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });
  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [respData, setRespData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();

  const initFilters = { sort_by: 'nama_lokasi', sort_type: 'asc' };
  const [reqFilters, setReqFilters] = useState<any>(initFilters);

  useEffect(() => {
    setModal({ ...modalProps });
    if(modalProps?.show) getAllData()
  }, [modalProps, reqFilters, pagination.currentPage]);

  useEffect(() => {
    let dataTableValue: any = [];
    respData.forEach((item: IJaringan) => {
      dataTableValue.push({
        number: item.number,
        id: item?.id,
        jenis: item?.jenis,
        nama: item?.nama_lokasi,
        parent: item?.parent,
        alamat: item?.alamat,
        ref_jenis_lokasi: item.ref_jenis_lokasi,
        lat: item?.lat,
        lon: item.lon,
        action: (
          <div onClick={()=> modalAccept(item) } className="badge badge-primary mx-3 cursor-pointer">
            <i className="fa-regular fa-circle-check"></i> Pilih
          </div>
        ),
      });
    });

    setData(dataTableValue);
  }, [respData]);

  const dataTable = useMemo(() => data, [data]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: pagination.currentPage + 1,
        limit: pagination.perPage,
        id_ref_jenis_lokasi_in: '4,10,11',
        ...reqFilters
      };

      const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);
      const { results, total } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results.map((d: any, i: number) => {
          d.id = d?.id_ref_lokasi
          d.jenis = d?.jenis_jaringan
          d.parent = d?.id_parent_lokasi?.nama_lokasi
          d.ref_jenis_lokasi = d?.id_ref_jenis_lokasi?.nama_jenis_lokasi
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

  /** SEARCH HANDLER AND DEBOUNCE */
  const searchHandler = (event: any) => {
    setReqFilters((prevState: any) => ({
      ...prevState,
      keyword: event.target.value ? event.target.value : null,
    }));
  };

  const debouncedSearchHandler = useCallback(debounce(searchHandler, 500), []);
  debouncedSearchHandler
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

  const modalDecline = () => {
    setModal({ ...modal, show: false });
  };

  const modalAccept = (item: any) => {
    setModal({
      ...modal,
      show: false,
      approved: true,
    });
    callbackModal(item);
  };

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Modal keyboard={false} backdrop='static' scrollable centered show={modal.show} onHide={modalDecline} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title className='w-100'>Daftar Gardu Induk, Gardu Distribusi & Gardu Hubung</Modal.Title>
          <InputGroup className='ms-auto w-25' size='sm'>
            <InputGroup.Text
              id='search-data'
              className='bg-transparent border-0 ps-0'
            >
              <i className='fa-solid fa-magnifying-glass fa-fw'></i>
            </InputGroup.Text>
            <FormControl
              size='sm'
              className='search bg-transparent ps-0 border-0'
              placeholder='Cari...'
              aria-label='Cari...'
              onChange={debouncedSearchHandler}
              aria-describedby='search-wsp'
            />
          </InputGroup>
        </Modal.Header>
        <Modal.Body>
          <ReactTable
            columns={columns}
            data={dataTable}
            containerClass='my-3 table table-responsive'
          />
        </Modal.Body>
        <Modal.Footer>
          <Pagination
            pagination={pagination}
            handlePaginationClick={handlePaginationClick}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalGIGH;
