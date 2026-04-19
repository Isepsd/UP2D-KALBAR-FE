import React, { useState, useEffect } from 'react';
import moment from 'moment';

/** CONFIG */
import { HIS_TRIP_COLUMNS } from '@app/configs/react-table/fasop/spectrum-history.column';
import { timeFormatSec } from '@app/helper/time.helper';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import HistoryFilter from '@app/modules/Fasop/HistoryFilter'
import { Badge } from 'react-bootstrap';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function ShTRIPPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(HIS_TRIP_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        b1: item?.path1,
        b2: item?.path2,
        b3: item?.path3,
        element: item?.path4,
        tanggal_awal: timeFormatSec(item.datum_1),
        tanggal_akhir: timeFormatSec(item.datum_2),
        // ocr: item?.ocr,

        status_beban: item?.i,
        status_ifr: item?.ifr,
        status_ifs: item?.ifs,
        status_ift: item?.ift,
        status_ifn: item?.ifn,
        status_ocr: (
          <Badge bg={item?.ocr === 1 ? 'success' : 'danger'} className="text-white">
            {item?.ocr === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        status_oct: (
          <Badge bg={item?.oct === 1 ? 'success' : 'danger'} className="text-white">
            {item?.oct === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        status_disz1: (
          <Badge bg={item?.disz1 === 1 ? 'success' : 'danger'} className="text-white">
            {item?.disz1 === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        status_disz2: (
          <Badge bg={item?.disz2 === 1 ? 'success' : 'danger'} className="text-white">
            {item?.disz2 === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        status_disz3: (
          <Badge bg={item?.disz2 === 1 ? 'success' : 'danger'} className="text-white">
            {item?.disz2 === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        status_gfr: (
          <Badge bg={item?.gfr === 1 ? 'success' : 'danger'} className="text-white">
            {item?.gfr === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        status_gft: (
          <Badge bg={item?.gft === 1 ? 'success' : 'danger'} className="text-white">
            {item?.gft === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        status_aro: (
          <Badge bg={item?.aro === 1 ? 'success' : 'danger'} className="text-white">
            {item?.aro === 1 ? 'ON' : 'OFF'}
          </Badge>
        ),
        cbtr: (
          <Badge bg={item?.cbtr === 1 ? 'success' : 'danger'} className="text-white">
            {item?.cbtr === 1 ? 'ON' : 'OFF'}
          </Badge>
        )
      });
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <TableDataListAction add={false} columns={columns} setColumns={setColumns} filterLayout="card">
        <HistoryFilter selectProps={{ fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih Jenis Point' }} queryParams={{ page: -1, jenispoint: 'TRIP' }} fieldKeyword='b1' isJenisPoint={false}
        />
      </TableDataListAction>

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.history.trip} primaryKey={'id_his_trip'} filterParams={{
        datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        datum_1_before: moment().format('YYYY-MM-DD HH:mm:ss'),
        sort_by: "-datum_1",
        cek_trip: 1
      }} deleteConfirmation />
    </>
  );
}
