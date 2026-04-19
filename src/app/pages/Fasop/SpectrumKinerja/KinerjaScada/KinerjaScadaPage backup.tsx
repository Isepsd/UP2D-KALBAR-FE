import React, { useState, useEffect } from 'react';

/** CONFIG */
import { KIN_SCADA_COLUMNS } from '@app/configs/react-table/fasop/spectrum-kinerja.column';
import { IFasopPointType } from '@app/interface/fasop-pointtype.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import qs from 'query-string';
import Filter from './Filter';

export default function KinerjaScadaPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { activePaging } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const queryParams = qs.parse(location.search);
  const [columns, setColumns] = useState<any>(KIN_SCADA_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  const remappedTreeJaringanData = (tree: any, level = 0) => {
    return tree
      ? tree?.map((item: IFasopPointType) => {
        return {
          id: item.id_pointtype,
          nama: item.name,
          durasi: 'abc',
          subRows: remappedTreeJaringanData(item?.child_pointtype, level + 1),
        };
      })
      : undefined;
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    const dataRows = remappedTreeJaringanData(data)
    setDataRows(dataRows);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    if (activePaging) {
      searchParams.delete('point_type');
      setSearchParams(searchParams);
    }
  }, [activePaging])

  return (
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout="card"
      >
        <Filter />
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().fasop.realtime.scada_realtime}
        primaryKey={'id_pointtype'}
        filterParams={{
          date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
        }}
      />
      {/* <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.fasop.point_type+'-tree'}
        primaryKey={'id_pointtype'}
      ></TableData> */}
    </>
  );
}
