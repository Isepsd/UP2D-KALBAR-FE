import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/** CONFIG */
import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
import { TRAFO_GI } from '@app/configs/react-table/master-jaringan.columns.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { useSelector } from 'react-redux';

export default function TrafoGIKTTPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(TRAFO_GI());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IJaringan, index: number) => {
      dataTableValue.push({
        number: index + 1,
        nama: item?.nama_lokasi,
        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        alamat: item?.alamat,
        lat: item?.lat,
        lon: item?.lon,
        kapasitas: item?.kapasitas ? item?.kapasitas : "",
        coverage: item?.coverage ? item?.coverage : "",
        status_trafo: item?.status_trafo ? item?.status_trafo : "",
        jenis_trafo: item?.jenis_trafo ? item?.jenis_trafo : "",
        i_max: item?.i_max ? item?.i_max : "",
        ratio_ct: item?.ratio_ct ? item?.ratio_ct : "",
        fk_meter_pembanding: item?.fk_meter_pembanding ? item?.fk_meter_pembanding : "",
        primer_tegangan_max: item?.primer_tegangan_max ? item?.primer_tegangan_max : "",
        primer_tegangan_min: item?.primer_tegangan_min ? item?.primer_tegangan_min : "",
        sekunder_tegangan_min: item?.sekunder_tegangan_min ? item?.sekunder_tegangan_min : "",
        sekunder_tegangan_max: item?.sekunder_tegangan_max ? item?.sekunder_tegangan_max : "",
        sinkron_data: item?.sinkron_data ? item?.sinkron_data : "",
        jenis_layanan: item?.jenis_layanan ? item?.jenis_layanan : "",
        id_i: item?.id_i ? item?.id_i : "",
        id_v: item?.id_v ? item?.id_v : "",
        id_p: item?.id_p ? item?.id_p : "",
        id_amr: item?.id_amr ? item?.id_amr : "",
        id_portal_ext: item?.id_portal_ext ? item?.id_portal_ext : "",
        url_webservice: item?.url_webservice ? item?.url_webservice : "",
        status: (<BadgeStatus status={item?.status_listrik}></BadgeStatus>),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete(item)} className='text-danger-hover'>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete')
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit')
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
        setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      <TableDataListAction
        add={true}
        columns={columns}
        setColumns={setColumns}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.jaringan.ref_lokasi}
        // exportConfig={{ path: API_PATH().master.management_upload.trafo_gi + '/download-excel', customParams: {} }}
        primaryKey={'id_ref_lokasi'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
        filterParams={{
          id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
          jenis_layanan: "KTT",
          sort_by: '-tgl_update'
        }}
      ></TableData>
    </>
  );
}
