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
import { REKAM_PADAM_EKSEKUSI_FIOHL } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';

function TablePeralatanFIOHL({ idTransEp, handleEdit, handleAdd, create = true, update = true }: any) {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(REKAM_PADAM_EKSEKUSI_FIOHL());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [action, setAction] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: any) => {
      dataTableValue.push({
        peralatan: item?.peralatan?.nama_lokasi || '-',
        indikasi: item.indikasi || '-',
        number: item.number,
        tanggal: item.tanggal ? moment(item.tanggal).format("DD-MM-YYYY HH:mm") : '-',
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
    setDataSelected(item);
    setAction("delete");
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
        <div>Peralatan FIOHL</div>
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
            path={API_PATH().opsisdis.rekap_padam.tranf_ep_peralatan_fiohl}
            primaryKey={'id_trans_ep_peralatan_fiohl'}
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

export default TablePeralatanFIOHL;
