import React, { useState, useEffect } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import AppButton from "@app/components/Button/Button";
import moment from 'moment';
moment.locale('id');

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import CardWidget from '@app/components/Card/CardWidget';
import { REKAM_PADAM_EKSEKUSI_RC } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
import { localeFormatter } from '@app/helper/number.helper';

function TablePeralatanRC({ idTransEp, handleEdit, handleAdd, create = true, update = true }: any) {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(REKAM_PADAM_EKSEKUSI_RC());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [action, setAction] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: any) => {
      dataTableValue.push({
        ...item,
        beban: localeFormatter(item?.beban),
        number: item.number,
        
        peralatan_rc: item?.peralatan?.nama_lokasi || item?.peralatan_rc,
        // lbs_manual: item?.peralatan_rc,
        beban_masuk: item.beban_masuk || '-',
        waktu_masuk: item?.waktu_masuk ,
        section: item.section || '-',
        rc_open: item.rc_open || '-',
        rc_close: item.rc_close || '-',
        status_open: item.status_rc_open || '-',
        status_close: item.status_rc_close || '-', 
        jam_open: item.tgl_open ? moment(item.tgl_open).format("DD-MM-YYYY HH:mm") : '-',
        jam_close: item.tgl_close ? moment(item.tgl_close).format("DD-MM-YYYY HH:mm") : '-',
        jenis_peralatan: item.jenis_peralatan,
        status_operasi: item.status_operasi || '-',
        // status_manuver: item.status_manuver || '-',
        r: item.r || '-',
        s: item.s || '-',
        t: item.t || '-',
        n: item.n || '-',
        arus_gangguan: item.ref_fai_arus_ggn_hmi?.nama || '-',
        keterangan: item.keterangan || '-',
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`jar-detail-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { handleEdit(item); }}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { deleteTambahPeralatan(item); }}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue);
  };

  const deleteTambahPeralatan = async (item: any) => {
    setDataSelected(item)
    setAction("delete")
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    if (!update) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <Card.Header className='text-uppercase mt-2 mb-2 d-flex justify-content-between align-items-center'>
        <div>Logsheet</div>
        {create &&
          <AppButton
            onClick={() => { handleAdd() }}
            variant='primary'
          >
            Tambah Data
          </AppButton>
        }

      </Card.Header>

      <div className="mt-2 mb-3">
        <CardWidget classNameBody='mb-2'>
          <TableData
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            path={API_PATH().opsisdis.rekap_padam.trans_ep_peralatan2}
            primaryKey={'id_trans_ep_peralatan'}
            action={action}
            onCloseModal={setAction}
            selected={dataSelected}
            rowData={dataRows}
            containerClass={'table table-responsive'}
            pagingPresistance={false}
            paging={{ perPage: 5, show: true }}
            filterParams={{
              id_trans_ep: idTransEp
            }}
          />
        </CardWidget>
      </div>
    </>
  );
}

export default TablePeralatanRC;
