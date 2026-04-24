import BadgeValue from "@app/components/Status/BadgeValue";
import { MONITORING_KEY_POINT_COLUMN, MONITORING_KEY_POINT_DETAIL_COLUMN } from "@app/configs/react-table/fasop/monitoring-key-point.column ";
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { API_PATH } from "@app/services/_path.service";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { Badge } from 'react-bootstrap';

export default function MonitoringKeyPointPage() {
  /** DATA RESP */
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataDetailRows, setDataDetailRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(MONITORING_KEY_POINT_COLUMN());
  const [columnsDetail] = useState<any>(MONITORING_KEY_POINT_DETAIL_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataColumnsDetail, setDataColumnsDetail] = useState<any>([]);
  const [rowSelected, setRowSelected] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        b1: item?.path1,
        b3: item?.path3,
        status: (<Badge bg={item?.value == 0 || item?.value == null ? `success text-white` : `danger text-white`}> {item?.value == 0 || item?.value == null ? 'Open' : 'Close'} </Badge>),
        // status: (<BadgeStatus status={item?.status}></BadgeStatus>),
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
        b1: item?.path1,
        b2: item?.path2,
        b3: item?.path3,
        kesimpulan: item?.kesimpulan,
        value: (<BadgeValue text={item?.value}></BadgeValue>),
        // status: (<BadgeStatus status={item?.status}></BadgeStatus>),
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
        <Filter />
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().fasop.laporan_scada.monitoring_keypoint}
        primaryKey={'point_number'}
        deleteConfirmation
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
        filterParams={{
          sort_by: " path1,path2,path3",
        }}
      />

      <hr className='my-4' />
      {rowSelected &&

        <TableData
          columnsConfig={dataColumnsDetail}
          respDataApi={handleRespDetailApi}
          rowData={dataDetailRows}
          path={API_PATH().fasop.laporan_scada.monitoring_keypoint_detail}
          primaryKey={'point_number'}
          deleteConfirmation
          filterParams={{
            sort_by: "datum_capture",
            path1: rowSelected?.path1,
            path3: rowSelected?.path3
          }}
          trigger={rowSelected?.path3}
          pagingPresistance={false}
        />}

    </>
  )
}