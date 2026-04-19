import React, { useMemo, useState, useEffect, useCallback } from 'react';
import ReactTable from '@app/components/ReactTable';
import Pagination from "@app/components/Pagination/Pagination";
import { Dropdown, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { generateDummyData } from '@app/helper/faker.helper';
import { IP_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';
import { IFaker } from '@app/interface/faker.interface';

export default function FasIPPage() {
  const navigate = useNavigate(); 
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 10,
    totalData: 100,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: 'Hapus data ini',
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });
  const initFilters = { keyword: '', sortBy: 'name', sortType: 'desc' };
  const [filters, setFilters] = useState<any>(initFilters);
  const [columns, setColumns] = useState<any>(IP_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  useEffect(() => {
    let dataDummy: any = [];
    const dummy: any = generateDummyData('faker');

    dummy.forEach((item: IFaker, index: number) => {
      dataDummy.push({
        number: index +1,
        id: item.uuid,
        pointpid: item.number,
        jenis_point: item.findName,
        hitung_kerja: item.number,
        kirim_telegram: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={item.boolean} disabled /></div>),
        nama: item.findName,
        ip1: item.ip,
        ip2: item.ip,
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
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
        ),
      });
    });

    setData(dataDummy);
  }, [pagination.currentPage]);

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  const dataTable = useMemo(() => data, [data]);

  const deleteData = () => {
    // console.log('aya');
  };

  const handleDelete = (item: any) => {
    // console.log(item);
    item;

    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleEdit = (item: any) => {
    navigate(`edit/${item?.id}`);
  };

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

  useEffect(() => {
    // console.log(filters);
  }, [filters]);

  return (
    <>
      <TableDataListAction add={true} columns={columns} setColumns={setColumns}></TableDataListAction>

      <ReactTable
        columns={dataColumns}
        data={dataTable}
        onSort={handleSort}
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
  );
}
