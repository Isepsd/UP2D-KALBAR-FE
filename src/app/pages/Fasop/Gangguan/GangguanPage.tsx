/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

/** CONFIG */
import { GANGGUAN_SAAT_INI_COLUMNS } from '@app/configs/react-table/fasop/gangguan-column';
// import { IFasopPointType } from '@app/interface/fasop-pointtype.interface';
import {  Form } from 'react-bootstrap';
/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { timeFormat, timeFormatAlt } from '@app/helper/time.helper';
import Filter from './Filter';
import qs from 'query-string';
import { Col, Row } from 'react-bootstrap';
import PeralatanScada from '@app/modules/Fasop/PeralatanScada';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import moment from 'moment';

export default function GangguanPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { activePaging } = useSelector((state: any) => state.ui);
  const queryParams = qs.parse(location.search);
  /** DATA RESP */
  const [trigger, setTrigger] = useState<any>();
  const [dataRows, setDataRows] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [scada, setScada] = useState<any>([]);

  const [columns, setColumns] = useState<any>(GANGGUAN_SAAT_INI_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
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
          kinerja: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.kinerja} disabled /></div>),
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
        // tgl_gangguan: item?.tgl_gangguan ? timeFormat(item?.tanggal_gangguan, "DD MMM YYYY HH:mm:ss") : "-",
      });

    });
    setDataRows(dataTableValue);
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

  useEffect(() => {
    getAllData()
    const timer = setInterval(() => {
      setTrigger(moment().valueOf())
    }, 60000)
    return () => {
      source.cancel()
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      {scada?.length > 0 &&
        <>
          <TableDataListAction
            add={false}
            columns={columns}
            setColumns={setColumns}
            filterLayout='card'
          >
            <Row>
              <Col md={4}>
                <Filter optionsScada={scada} />
              </Col>
              <Col md={8}>
                <PeralatanScada />
              </Col>
            </Row>
          </TableDataListAction>

          <TableData
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
            path={API_PATH().fasop.laporan_scada.gangguan_peralatan_scada}
            primaryKey={'id_pointtype'}
            trigger={trigger}
          />
        </>
      }
    </>
  );
}
