import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { KINERJA_SCADA_HIST } from '@app/configs/react-table/fasop/spectrum-history.column';
import Filter from './Filter copy 2';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { timeFormat } from '@app/helper/time.helper';

export default function ScadaPage() {

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);

  const [columns, setColumns] = useState<any>(KINERJA_SCADA_HIST());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);
  const [scada, setScada] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
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

        satuan_akhir: item.satuan_2,
        durasi: item?.durasi,
        keterangan: item?.kesimpulan,
      });

    });

    setDataRows(dataTableValue)
  };

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

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    getAllData()
    return () => {
      source.cancel()
    }
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {scada?.length > 0 &&
        <>
          <TableDataListAction
            add={false}
            columns={columns}
            filterLayout='card'
            setColumns={setColumns}
          >
            <Filter optionsScada={scada} />

          </TableDataListAction>

          <TableData
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
            path={API_PATH().fasop.laporan_scada.histori_peralatan_scada}
            primaryKey={'id_pointtype'}
          ></TableData>
        </>
      }
    </>
  );
}
