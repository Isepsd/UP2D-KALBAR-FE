import React, { useMemo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import ReactTable from '@app/components/ReactTable';
import Pagination from '@app/components/Pagination/Pagination';

import { useApp } from '@app/context/AppContext';

import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { getAllByPath } from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { MONITORING_APKT_DETAIL_PADAM } from '@app/configs/react-table/apkt.columns.config'
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { first, get } from 'lodash';


export default function TableUpdateJaringanTree({
  move = true,
  rowSelect = false,
  rowSelectType = "checkbox",
  selectedRows
}: ITreeJaringan) {
  const source = axios.CancelToken.source();

  const { searchValue } = useApp();

  const pathLokasi = 'master/jaringan/ref-lokasi';

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

  const initFilters = {
    keyword: '',
    order: 'asc',
    id_ref_lokasi: undefined,
  };

  const [filters, setFilters] = useState<any>(initFilters);

  const [garduIndukOptions, setGarduIndukOptions] = useState<any>([]);

  /** DATA RESP */
  const [data, setData] = useState<any>([]);

  /** INIT DATA TREE */
  const remappedTreeJaringanData = (tree: any, level = 0) => {
    return tree
      ? tree?.map((d: any) => {
        return {
          nama_lokasi: d?.nama_lokasi,
          id: d?.id_ref_lokasi,
          id_ref_jenis_lokasi: d?.nama_jenis_lokasi,
          kode_lokasi: d?.kode_lokasi,
          no_tiang: d?.no_tiang,
          alamat: d?.alamat,
          coverage: d?.coverage,
          subRows: remappedTreeJaringanData(d?.children, level + 1),
          level: level,
        };
      })
      : undefined;
  };

  const getAllDataGarduInduk = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: '-1',
        limit: "-1",
        id_ref_jenis_lokasi: 4,
      };

      const req: any = await getAllByPath(pathLokasi, params, source.token);
      const { results } = req;

      let data: any = results.map((d: any) => {
        return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
      });
      setGarduIndukOptions(data);
      setFilters((prev: any) => ({
        ...prev,
        id_ref_lokasi: (first(data) as any)?.id_ref_lokasi,
      }));
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  /** COLUMN FILTER */
  const [columns, setColumns] = useState<any>(
    move
      ? MONITORING_APKT_DETAIL_PADAM()
      : (MONITORING_APKT_DETAIL_PADAM() as any)
        .map((col: any) => {
          return col;
        })
        .filter((f: any) => f?.accessor != 'action')
  );

  const [dataColumns, setDataColumns] = useState<any>([]);

  useEffect(() => {
    setFilters((prevState: any) => ({
      ...prevState,
      search: searchValue,
    }));
  }, [searchValue]);

  const dataTable = useMemo(() => data, [data]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: pagination.currentPage + 1,
        limit: pagination.perPage,
        ...filters,
      };

      delete params.order;

      const req: any = await getAllByPath(
        'master/jaringan/tree-jaringan',
        params,
        source.token
      );

      const { results }: any = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        const dataResults: any = results;
        let data = remappedTreeJaringanData(get(dataResults, '[0]')?.children);

        setData(data ? data : []);
      } else {
        setData([]);
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
        sort_by: sortBy[0]['id'],
        order: sortBy[0]['desc'] ? 'desc' : 'asc',
      }));
    }
  }, []);

  const changeGarduIndukOptions = (selected: any) => {
    setFilters((prev: any) => ({
      ...prev,
      id_ref_lokasi: selected,
    }));
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    if (filters?.id_ref_lokasi) {
      getAllData();
    }
  }, [pagination?.currentPage, filters]);

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    getAllDataGarduInduk();
    return () => {
      setData([]);
      source.cancel();
    };
  }, []);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <TableDataListAction
        columns={columns}
        setColumns={setColumns}
        childrenPosition='left'
        add={false}
      >
        <div style={{ width: '300px' }}>
          <Select
            placeholder='Pilih Gardu Induk'
            styles={ReactSelectStyle}
            value={garduIndukOptions?.filter((x: any) => x?.value == filters.id_ref_lokasi)}
            onChange={(val: any) => changeGarduIndukOptions(val?.value)}
            options={garduIndukOptions}
          />
        </div>
      </TableDataListAction>
      <ReactTable
        rowSelect={rowSelect}
        rowSelectType={rowSelectType}
        containerClass='table-responsive mt-3'
        columns={dataColumns}
        data={dataTable}
        onSort={handleSort}
        onCheckedRows={selectedRows}
      />
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
      />
    </>
  );
}

export interface ITreeJaringan {
  move?: boolean;
  rowSelect?: boolean;
  rowSelectType?: string;
  selectedRows?: any;
}