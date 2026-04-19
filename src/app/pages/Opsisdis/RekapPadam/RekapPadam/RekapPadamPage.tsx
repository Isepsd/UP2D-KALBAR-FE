
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';

import Filter from './Filter';
import ModalPhoto from './ModalPhoto'
import ModalCopy from './ModalCopyWA'
// import { putByPath } from '@app/services/main.service';
import TableData from '@app/modules/Table/TableData';
import ModalData from '@app/components/Modals/ModalForm';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import {
  GANGGUAN_REKAP_PADAM,
  GANGGUAN_REKAP_PADAM_DETAIL,
} from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
import moment from 'moment';
import { localeFormatter } from '@app/helper/number.helper';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { cdnUrl } from '@app/helper/cdn.helper';

export default function RekapPadamPage() {
  const navigate = useNavigate();
  // const source = axios.CancelToken.source();
  let [searchParams] = useSearchParams();
  // const status = searchParams.get('status');
  const tanggal_after = searchParams.get('tanggal_after');
  const tanggal_before = searchParams.get('tanggal_before');
  const [actionparent, setActionParent] = useState<string>();
  // const [action] = useState<string>();
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  // const [
  // dataRowsPosted, 
  // setDataRowsPosted] = useState<any>([]);

  const [dataSelected, setDataSelected] = useState<any>();
  const [roleActions, setRoleActions] = useState<any>({});

  /** MODAL */
  const [modalCopyWA, setModalCopyWA] = useState<any>({
    approved: false,
    size: 'md',
    title: `Copy Whatapps`,
  });
  const [modalInsertPhoto, setModalInsertPhoto] = useState<any>({
    approved: false,
    size: 'md',
    title: `Tambah Foto`,
  });

  const [modalViewPhoto, setModalViewPhoto] = useState<any>({
    approved: false,
    size: 'md',
    title: `View Foto`,
  });

  const [columns, setColumns] = useState<any>(GANGGUAN_REKAP_PADAM());
  const [columnsDetail,
    // setColumnsDetail
  ] = useState<any>(
    GANGGUAN_REKAP_PADAM_DETAIL()
  );
  const [dataColumns, setDataColumns] = useState<any>([]);
  // const [
  // dataColumnsDetail, 
  // setDataColumnsDetail] = useState<any>([]);

  const copyWA = (item: any) => {
    setDataSelected(item);
    setModalCopyWA((prev: any) => ({ ...prev, show: true }));
  };

  const insertPhoto = (item: any) => {
    setDataSelected({ ...item });
    setModalInsertPhoto((prev: any) => ({ ...prev, show: true }));
  };

  const viewPhoto = (item: any) => {
    setDataSelected({ ...item });
    setModalViewPhoto((prev: any) => ({ ...prev, show: true }));
  };

  const handlePosting = (item: any) => {
    setDataSelected(item);
    setActionParent('posting-rekap-padam')
  }

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setActionParent('delete')
  }

  const handleDetail = (item: any) => {
    navigate(`detail/${item?.id_trans_ep}`);
  }

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: any) => {
      let keypoint: any = (item?.gangguan_padam == "PERALATAN")?item?.keypoint?.nama_lokasi:item?.lbs_manual;
      // console.log("item porintg", item?.posting);
      // console.log("parseFloat(item.r)", localeFormatter(item.r));
      let status: any = ''
      switch (item.status) {
        case 'Padam': status = <div className='text-danger'>Padam</div>; break;
        case 'Normal': status = <div className='text-success'>Normal</div>; break;
        case 'Nyala Bertahap': status = <div className='text-warning'>Nyala Bertahap</div>; break;
        default: break;
      }
      // console.log("item.ens", item.ens);

      dataTableValue.push({
        ...item,
        no_event: item.no_event || '-',
        no_apkt: item.no_apkt || '-',
        status: status,
        beban_padam: localeFormatter(item.beban_padam),
        ens: localeFormatter(item.ens) + " kWh",
        // ens: localeFormatter(100.13),
        r: localeFormatter(item.r),
        s: localeFormatter(item.s),
        t: localeFormatter(item.t),
        n: localeFormatter(item.n),
        // r: item.r,
        // s: item.s,
        // t: item.t,
        // n: item.n,
        lat: item.lat || '-',
        lon: item.lon || '-',
        cuaca: item?.ref_ep_cuaca?.nama,
        keypoint: (!item?.posting && roleActions?.update) ? (
          <a className='btn-link pointer' onClick={() => {
            navigate(`edit/${item?.id_trans_ep}`);
          }}>
            {keypoint}
          </a>
        ) : <span onClick={() => { handleDetail(item) }}>{keypoint}</span>,
        // keypoint: (
        //   <a className='btn-link' onClick={() => {
        //     navigate(`edit/${item?.id_trans_ep}`);
        //   }}>
        //     {item?.keypoint?.nama_lokasi}
        //   </a>
        // ),
        photo: item?.photo ? <span 
          className='' 
          onClick={() => { 
            viewPhoto(item);
          }}>Photo</span> : '-',
        durasi: item?.durasi || '-',
        jam_buka: item.jam_buka ? moment(item.jam_buka).format('DD-MM-YYYY HH:mm:ss') : '-',
        jam_trip: item.jam_trip ? moment(item.jam_trip).format('DD-MM-YYYY HH:mm:ss') : '-',
        jam_tutup: item.jam_tutup ? moment(item.jam_tutup).format('DD-MM-YYYY HH:mm:ss') : '-',
        jam_normal: item.jam_normal ? moment(item.jam_normal).format('DD-MM-YYYY HH:mm:ss') : '-',
        date: moment(item.tanggal).format('DD-MM-YYYY'),
        number: item.number,
        id: item?.id_meter,
        ufr: item?.id_meter,
        penyulang: item?.id_meter,
        gardu_induk: item?.id_meter,
        indikasi: item?.ref_ep_indikasi?.nama,
        kategori: item?.ref_ep_indikasi?.kategori,
        up3: item?.keypoint?.up3?.nama_lokasi,
        ulp: item?.keypoint?.ulp?.nama_lokasi,
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`jar-detail-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {roleActions?.posting &&
                <Dropdown.Item onClick={() => {
                  handlePosting(item)
                }}>
                  Posting
                </Dropdown.Item>
              }
              {/* <Dropdown.Item onClick={() => {
                updatePosting({
                  id_trans_ep: item?.id_trans_ep,
                  posting: 1,
                })
              }}>
                Posting
              </Dropdown.Item> */}
              {roleActions?.delete &&
                < Dropdown.Item onClick={() => handleDelete(item)}>
                  Delete
                </Dropdown.Item>
              }
              <Dropdown.Item onClick={() => copyWA(item)}>
                Copy WA
              </Dropdown.Item>
              {roleActions?.insert_photo &&
                <Dropdown.Item onClick={() => insertPhoto(item)}>
                  Insert Photo
                </Dropdown.Item>
              }
            </Dropdown.Menu>
          </Dropdown >
        ),
      });
    });
    setDataRows(dataTableValue);
  };

  // const handleRespDataApiPosted = (data: any) => {
  //   let dataTableValue: any = [];
  //   data?.forEach((item: any) => {
  //     dataTableValue.push({
  //       ...item,
  //       no_event: item.no_event || '-',
  //       no_apkt: item.no_apkt || '-',
  //       status: item.status,
  //       ens: item.ens,
  //       r: item.r,
  //       s: item.s,
  //       t: item.t,
  //       n: item.n,
  //       up3: item?.up3?.nama_up3 || '-',
  //       ulp: item?.ulp?.nama_ulp || '-',
  //       lat: item.lat || '-',
  //       lon: item.lon || '-',
  //       indikasi: item.indikasi || '-',
  //       photo: item?.photo || '-',
  //       cuaca: item?.ref_ep_cuaca?.nama,
  //       keypoint: item?.keypoint?.nama_lokasi,
  //       jam_trip: item.jam_trip ? moment(item.jam_trip).format('DD-MM-YYYY HH:mm:ss') : '-',
  //       jam_tutup: item.jam_tutup ? moment(item.jam_tutup).format('DD-MM-YYYY HH:mm:ss') : '-',
  //       jam_normal: item.jam_normal ? moment(item.jam_normal).format('DD-MM-YYYY HH:mm:ss') : '-',
  //       date: moment(item.tanggal).format('DD-MM-YYYY'),
  //       number: item.number,
  //       id: item?.id_meter,
  //       ufr: item?.id_meter,
  //       penyulang: item?.id_meter,
  //       gardu_induk: item?.id_meter,
  //     });
  //   });

  //   setDataRowsPosted(dataTableValue);
  // };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS("rekap-padam-data")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
      insert_photo: ROLE_ACTION(roleAccess, 'insert-photo'),
      posting: ROLE_ACTION(roleAccess, 'posting'),
    };
    setRoleActions(roleAct);
    if (!roleAct?.delete && !roleAct?.update && !roleAct?.posting && roleAct?.insert_photo) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    // const cols = columnsDetail?.filter(({ show }: any) => show === true);
    // setDataColumnsDetail(cols);
  }, [columnsDetail]);

  // console.log("modalViewPhoto", modalViewPhoto);
  return (
    <>
      <TableDataListAction
        add={roleActions?.create}
        columns={columns}
        setColumns={setColumns}
        module='Rekam Padam'
        filterLayout='card'
      >
        <Filter />
      </TableDataListAction>
      <div className='mb-4'>
        <TableData
          columnsConfig={dataColumns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          path={API_PATH().opsisdis.rekap_padam.trans_ep}
          primaryKey={'id_trans_ep'}
          action={actionparent}
          onCloseModal={setActionParent}
          selected={dataSelected}
          filterParams={{
            sort_by: '-tgl_entri',
            // posting: 0, 
            tanggal_after: tanggal_after,
            tanggal_before: tanggal_before
          }}
        />
      </div>

      {/* <TableDataListAction
        add={false}
        columns={columnsDetail}
        setColumns={setColumnsDetail}
        module='Rekam Padam'
        filterLayout='card'
      />

      <div>
        <TableData
          columnsConfig={dataColumnsDetail}
          respDataApi={handleRespDataApiPosted}
          rowData={dataRowsPosted}
          path={API_PATH().opsisdis.rekap_padam.trans_ep}
          primaryKey={'id_meter'}
          action={action}
          selected={dataSelected}
          filterParams={{
            // status: status,
            posting: 1,
            tanggal_after: tanggal_after,
            tanggal_before: tanggal_before,
            sort_by: '-tgl_entri'
          }}
        />
      </div> */}

      <ModalData modalProps={modalCopyWA}>
        <ModalCopy data={dataSelected} />
      </ModalData>

      <ModalData modalProps={modalInsertPhoto}>
        <ModalPhoto dataSelected={dataSelected} />
      </ModalData>

      <ModalData modalProps={modalViewPhoto}>
        <div>
          <img alt='' src={cdnUrl(dataSelected?.photo)} width="100%" />
        </div>
      </ModalData>
    </>
  );
}
