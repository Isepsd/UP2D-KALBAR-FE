import React, { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom';

import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import { get, random } from 'lodash';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

type Props = { pathService: string, columnsConfig: any, primaryKey: string, spaceTop?: number, isParent?: boolean, filterParams?: any, type?: string, dataParent?: any, parentTrigger?: any };

export default function TableApktJarDetail({
  pathService, columnsConfig, primaryKey, filterParams, type = undefined, dataParent = null, parentTrigger = null }: Props) {
  const { closeModal } = useSelector((state: any) => state.ui);
  // let [searchParams] = useSearchParams();

  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [triggers, setTriggers] = useState<any>(null);

  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any, index: number) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      let status_apkt = "Belum Kirim"
      let color = "secondary"
      switch (item?.status_apkt_kirim) {
        case 1:
          status_apkt = "Sedang Kirim"
          color = "success"
          break;
        case 2:
          status_apkt = "Gagal Kirim"
          color = "danger"
          break;
      }
      dataTableValue.push({
        ...item,
        number: item?.number,
        segment: get(item, 'segment.nama_lokasi'),
        section: get(item, 'section.nama_lokasi'),
        zone: get(item, 'zone.nama_lokasi'),
        up3_1: get(item, 'up3_1.nama_lokasi'),
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        tgl_laporan: item?.tgl_laporan,
        tgl_padam: item?.tgl_padam,
        tgl_kirim_apkt: item?.tgl_apkt_kirim,
        tgl_mulai_apkt_kirim_padam: item?.tgl_mulai_apkt_kirim_padam,
        tgl_apkt_kirim_padam: item?.tgl_apkt_kirim_padam,
        status_data: (<span className={`w-100 badge badge-${item?.status_data ? 'success' : 'danger'}`}>{item?.status_data ? 'Nyala' : 'Padam'}</span>),
        webservice: item?.webservice,
        server_apkt: item?.server_apkt,
        input_apkt: item?.input_apkt,
        output_apkt: item?.output_apkt,
        status_kirim_apkt: (<span className={`w-100 badge badge-${color}`}>{status_apkt}</span>),
        gardu: get(item, 'gardu'),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`jar-detail-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                type == 'kirim-gardu-padam' && (
                  <>
                    <Dropdown.Item onClick={() => handleUpdateTglNyala(item)}>
                      Update Tgl Nyala
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleKirimPadamApkt(item)}>
                      Kirim Padam ke APKT
                    </Dropdown.Item>
                  </>
                )
              }
              {
                type == 'kirim-gardu-nyala' && (
                  <>
                    <Dropdown.Item
                      onClick={() => handleKirimNyalaApkt(item)}>
                      Kirim Nyala ke APKT
                    </Dropdown.Item>
                  </>
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  const handleUpdateTglNyala = (item: any) => {
    setDataSelected(item);
    setAction('update-tgl-nyala');
  };

  const handleKirimPadamApkt = (item: any) => {
    setDataSelected(item);
    setAction('update-kirim-padam');
  };
  const handleKirimNyalaApkt = (item: any) => {
    setDataSelected(item);
    setAction('update-kirim-nyala');
  };

  useEffect(() => {
    // console.log("parentTrigger", parentTrigger);

    if (dataParent || parentTrigger) {
      setTriggers(random(0, 100))
    }

  }, [dataParent, parentTrigger])

  useEffect(() => {
    setDataRows([])
  }, [type])

  useEffect(() => {
    setColumns(columnsConfig)
  }, [columnsConfig])

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])
  filterParams;
  // console.log("filterParams", filterParams);


  return (
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        spaceTop={0}
      >
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={pathService}
        primaryKey={primaryKey}
        selected={dataSelected}
        action={action}
        filterParams={{
          id_trans_jar: dataParent?.id ? dataParent?.id : null,
          sort_by: "+tgl_selesai"
        }}
        trigger={triggers}
        pagingPresistance={true}
        onCloseModal={setAction}
      />
    </>
  )
}
