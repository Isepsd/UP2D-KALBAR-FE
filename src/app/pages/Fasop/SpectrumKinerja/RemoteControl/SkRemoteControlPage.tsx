
import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { get } from "lodash";
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { timeFormat } from '@app/helper/time.helper';
import { KIN_RC  } from '@app/configs/react-table/fasop/spectrum-kinerja.column';
import { HIS_REMOTE_COLUMNS_detail } from '@app/configs/react-table/fasop/spectrum-history.column';
import RCKinFilter from '@app/modules/Fasop/RCKinFilter';

// import moment from 'moment';
export default function MonitoringKeyPointPage() {
  /** DATA RESP */

  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(KIN_RC());
  const [dataColumns, setDataColumns] = useState<any>([]);

  
  const [rowSelected, setRowSelected] = useState<any>();
  const [columnsDetail] = useState<any>(HIS_REMOTE_COLUMNS_detail());
  const [dataDetailRows, setDataDetailRows] = useState<any>([]);
  const [dataColumnsDetail, setDataColumnsDetail] = useState<any>([]);



 
 

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        tanggal: timeFormat(item.datum_1),
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        element: item?.path4,
        datum_1: item?.datum_1,
        point_number:item?.point_number,
        jlm_rc: item?.jlm_rc,
        status_2:item?.status_2,
        performance: item?.performance ? item?.performance : "0.0",
      });
    });
    setDataRows(dataTableValue);
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDetailApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
   
        operator: item?.msg_operator,
        point_number:item?.point_number,
        tgl_mulai_remote: item?.datum_1,
        tgl_selesai_remote: item?.datum_2,
        // status_1: item?.status_1,
        status_2: item?.status_2,
        durasi: item?.durasi,
      });
    });
    setDataDetailRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);


  useEffect(() => {
    const cols = columnsDetail?.filter(({ show }: any) => show === true);
    setDataColumnsDetail(cols);
  }, [columnsDetail]);

  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    setRowSelected(selected);
  };

  // console.log("dataColumnsDetail", dataColumnsDetail);


  
  return (
    <>
  <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
      >
      <RCKinFilter  />
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().fasop.laporan_scada.kinerja_rc} 
        primaryKey={'id'}
        deleteConfirmation
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
        filterParams={{
          // sort_by: " path1,path2,path3,point_number",
        }}
      />

      <hr className='my-4' />
      {rowSelected &&

        <TableData
          columnsConfig={dataColumnsDetail}
          respDataApi={handleRespDetailApi}
          rowData={dataDetailRows}
          path={API_PATH().fasop.laporan_scada.histori_rc}
          primaryKey={'id_his_rc'}
          deleteConfirmation
          filterParams={{
            // path1: rowSelected?.path1,
            // path2: rowSelected?.path2,
            path3: rowSelected?.path3,
            path4: rowSelected?.path4,
            status_2: rowSelected?.status_2,
            datum_1: rowSelected?.datum_1
          }}
          trigger={rowSelected?.path3}
          pagingPresistance={false}
        />}

    </>
  )
}