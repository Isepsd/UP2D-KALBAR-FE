
import { KIN_SCADA_COLUMNS } from '@app/configs/react-table/fasop/spectrum-kinerja.column';
import { KINERJA_SCADA_HIST } from '@app/configs/react-table/fasop/spectrum-history.column';
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { API_PATH } from "@app/services/_path.service";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { timeFormat } from '@app/helper/time.helper';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
// import moment from 'moment';
export default function MonitoringKeyPointPage() {
  /** DATA RESP */
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataDetailRows, setDataDetailRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(KIN_SCADA_COLUMNS());
  const [columnsDetail] = useState<any>(KINERJA_SCADA_HIST());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataColumnsDetail, setDataColumnsDetail] = useState<any>([]);
  const [rowSelected, setRowSelected] = useState<any>();
  const [scada, setScada] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const source = axios.CancelToken.source();
  /** GET DATA unit pembangkit */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        is_induk: 'INDUK',
      };


      const req: any = await getAllByPath(API_PATH().master.fasop.point_type_get, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.name,
          value: item?.id_pointtype,
          jenis: item?.jenispoint
        })
      })
      setLoading(false)
      setScada(unit)
    } catch (err: any) {
      setScada(null)
      setLoading(false)
    }
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        peralatan_scada: item.peralatan_scd,
        b1: item?.path1text,
        b2: item?.path2text,
        b3: item?.path3text,
        down: item.downtime,
        durasi: item?.durasi,
        point_number:item?.point_number,
        avability: item?.avability,
        // keterangan: item?.kesimpulan,
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
        peralatan_scada: item.peralatan_scada,
        b1: item?.path1,
        b2: item?.path2,
        b3: item?.path3,
        tanggal_awal: item?.datum_1 ? timeFormat(item.datum_1, "DD-MM-YYYY HH:mm:ss") : "-",
        satuan_awal: item.status_1,
        tanggal_akhir: item?.datum_2 ? timeFormat(item.datum_2, "DD-MM-YYYY HH:mm:ss") : "-",
        point_number:item?.point_number,
        satuan_akhir: item.satuan_2,
        durasi: item?.durasi,
        keterangan: item?.kesimpulan,
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

  useEffect(() => {
    getAllData()
  }, [])

  
  return (
    <>
      <TopBarLoader isLoading={loading} />
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
      >
      <Filter optionsScada={scada} />
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().fasop.laporan_scada.kinerja_peralatan_scada}
        primaryKey={'point_number'}
        deleteConfirmation
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
        filterParams={{
         
        }}
      />

      <hr className='my-4' />
      {rowSelected &&

        <TableData
          columnsConfig={dataColumnsDetail}
          respDataApi={handleRespDetailApi}
          rowData={dataDetailRows}
          path={API_PATH().fasop.laporan_scada.histori_peralatan_scada}
          primaryKey={'point_number'}
          deleteConfirmation
          filterParams={{
            point_number: rowSelected?.point_number,
            jenispoint: rowSelected?.jenispoint,
           
          }}
          trigger={rowSelected?.point_number}
          pagingPresistance={false}
        />}

    </>
  )
}