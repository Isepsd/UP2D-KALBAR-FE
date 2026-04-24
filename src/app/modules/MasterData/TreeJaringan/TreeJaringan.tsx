import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from '@app/components/Pagination/Pagination';


import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { getAllByPath } from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { TREE_JARINGAN } from '@app/configs/react-table/master-jaringan.columns.config';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { get } from 'lodash';
import ModalMoveJaringan from './ModalMoveJaringan';
import TableData from '@app/modules/Table/TableData';
import { API_PATH } from '@app/services/_path.service';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { setActiveFilters } from '@app/store/reducers/ui';
import { useDispatch } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function TreeJaringan({
  move = true,
  rowSelect = false,
  rowSelectType = "checkbox",
  onCheckedRows,
  idRefLokasi
}: ITreeJaringan) {
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });

  const initFilters = {
    // keyword: '',
    order: 'asc',
    id_ref_lokasi: undefined,
  };

  const [filters, setFilters] = useState<any>(initFilters);
  const [garduInduk, setGarduInduk] = useState<any>();


  const [garduIndukOptions, setGarduIndukOptions] = useState<any>([]);

  /** DATA RESP */
  const [triggerTableData, setTriggerTableData] = useState<any>();
  const [dataRows, setDataRows] = useState<any>([]);

  /** MODAL */
  const [modalManuverAset, setModalManuverAset] = useState<any>({
    show: false,
  });

  const [roleActions, setRoleActions] = useState<any>({});

  useEffect(() => {
    // console.log(idRefLokasi);

    if (idRefLokasi) {
      setFilters((prev: any) => ({ ...prev, id_ref_lokasi: idRefLokasi }));
      setTriggerTableData(moment());
    }
  }, [idRefLokasi])


  useEffect(() => {
    let roleAccess = ROLE_ACCESS("tree-jaringan")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);
  }, [])



  const remappedTreeJaringanData = (tree: any, level = 0) => {
    // console.log("tree", tree);

    return tree
      ? tree?.map((item: any) => {
        return {
          nama_lokasi: item?.nama_lokasi,
          id: item?.id_ref_lokasi,
          jenis_lokasi: item?.jenis_lokasi,
          fungsi_lokasi: item?.fungsi_lokasi,
          kode_lokasi: item?.kode_lokasi,
          no_tiang: item?.no_tiang,
          alamat: item?.alamat,
          coverage: item?.coverage,
          unit_induk: item?.unit_induk,
          up31: item?.up31,
          ulp1: item?.ulp1,
          subRows: remappedTreeJaringanData(item?.children, level + 1),
          level: level,
          action: roleActions?.update ? (
            <OverlayTrigger
              key={'top'}
              placement={'top'}
              overlay={<Tooltip id={`tooltip-${'top'}`}>Pindah</Tooltip>}
            >
              <Button
                variant='primary'
                size='sm'
                onClick={() => handleMove(item)}
              >
                <i className='fa-solid fa-arrows-up-down-left-right'></i>
              </Button>
            </OverlayTrigger>
          ) : ""
        };
      })
      : undefined;
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    const dataRows = remappedTreeJaringanData(get(data, '0.children'))
    setDataRows(dataRows);
  };

  /** MOVE */
  const handleMove = (selected: any) => {
    setModalManuverAset((prevState: any) => ({
      ...prevState,
      show: true,
      selected: selected,
    }));
  };

  /** COLUMN FILTER */
  const [columns, setColumns] = useState<any>(
    move
      ? TREE_JARINGAN()
      : (TREE_JARINGAN() as any)
        .map((col: any) => {
          return col;
        })
        .filter((f: any) => f?.accessor != 'action')
  );

  const [dataColumns, setDataColumns] = useState<any>([]);

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


  const changeGarduIndukOptions = (selected: any) => {
    // console.log("selected", selected);
    setGarduInduk(selected)
    let active = { filters: { id_ref_lokasi: selected?.value }, count: 1 }
    dispatch(setActiveFilters(active));
    setFilters((prev: any) => ({
      ...prev,
      id_ref_lokasi: selected?.value,
    }));
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
      setFilters((prev: any) => ({
        ...prev,
        id_ref_lokasi: (get(data, '0') as any)?.id_ref_lokasi,
      }));
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    getAllDataGarduInduk();
    return () => {
      setDataRows([]);
      source.cancel();
    };
  }, []);

  useEffect(() => {

    if (!garduInduk) {
      setGarduInduk(garduIndukOptions[0])
    }
  }, [garduIndukOptions])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {move == true &&
        <TableDataListAction
          columns={columns}
          setColumns={setColumns}
          add={false}
          filterLayout="card"
        >
          <div style={{ width: '300px' }}>
            <Select
              placeholder='Pilih Gardu Induk'
              styles={ReactSelectStyle}
              value={garduInduk}
              onChange={(val: any) => changeGarduIndukOptions(val)}
              options={garduIndukOptions}
            />
          </div>
        </TableDataListAction>
      }
      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        trigger={filters?.id_ref_lokasi ? triggerTableData : null}
        path={API_PATH().master.jaringan.tree_jaringan}
        primaryKey={'id_ref_lokasi'}
        rowSelect={rowSelect}
        rowSelectType={rowSelectType}
        onCheckedRows={onCheckedRows}
        filterParams={filters}
      ></TableData>
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
      />
      <ModalMoveJaringan modalProps={modalManuverAset} callbackData={() => setTriggerTableData(moment())} garduIndukSelected={garduInduk} />
    </>
  );
}

export interface ITreeJaringan {
  move?: boolean;
  rowSelect?: boolean;
  rowSelectType?: string;
  onCheckedRows?: any;
  idRefLokasi?: any;
}