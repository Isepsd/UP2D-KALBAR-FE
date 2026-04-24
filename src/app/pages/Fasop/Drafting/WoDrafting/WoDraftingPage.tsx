import React, { useState, useEffect } from 'react';
import { cdnUrl } from '@app/helper/cdn.helper';
/** CONFIG */
import { SCADATEL_WO_DRAFTING } from "@app/configs/react-table/fasop/scadatel-column-drafting";

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListActionNEWWW from '@app/modules/Table/TableDataListActionNEWWW';
import ModalFormWO from '@app/components/Modals/ModalFormWO';
import WoDraftingViewForm from './WoDraftingViewForm'
import WoDraftingPostingForm from './WoDraftingPostingForm'
import WoDraftingForm from './WoDraftingForm'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { IFasopCPoint } from '@app/interface/fasop-c-point.interface';
// import StatisticKinerjaWO from '@app/modules/Dashboard/StatisticKinerjaWO';
import { useSelector } from 'react-redux';

// import ModalForm from '@app/components/Modals/ModalForm';
// import { CONFIG_BOX_KOMULATIF } from '@app/configs/wo-drafting.config';

import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { useLocation, useNavigate } from 'react-router-dom';

// import { nanoid } from '@reduxjs/toolkit';
import { Badge } from 'react-bootstrap';
// import CardWidget from '@app/components/Card/CardPage';

export default function FasPointAnalogDigitalPage() {
  const { closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */

  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [detailPosting,setdetailPosting] = useState<any>();
  const [columns, setColumns] = useState<any>(SCADATEL_WO_DRAFTING());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  function getPathFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname; // Mengembalikan path URL tanpa domain
    } catch (error) {
      console.error('Invalid URL:', url);
      return url; // Kembali ke URL asli jika tidak valid
    }
  }
  const [loading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
const [modal, setModal] = useState<any>({
    approved: false,
    size: "s",
    title: `View`,
  });

  const [modalAdd, setModalAdd] = useState<any>({
    approved: false,
    size: "lg",
    title: `Tambah Data`,
  });

  const [modalEdit, setModalEdit] = useState<any>({
    approved: false,
    size: "lg",
    title: `Edit Data`,
  });

  const [modalPosting, setModalPosting] = useState<any>({
    approved: false,
    size: "s",
    title: `Posting Data`,
  });

  // const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);
 

  // const renderBoxKomulatif = useMemo(() => {
  //   return boxKomulatif?.map((item: any) => (
  //     <Col md={3} key={nanoid()} className="mb-2">
  //       <StatisticKinerjaWO
  //         key={nanoid()}
  //         variant={item?.variant}
  //         path={item?.path}
  //         suffix={item?.suffix}
  //         label={item?.label}
  //         fieldName={item.fieldName}
  //         // filterParams={item?.filterParams}
  //       />
  //     </Col>
  //   ));
  // }, []);
  
  /** MAP DATA FROM API RESPONSE */
              const handleRespDataApi = (data: any) => {
                let dataTableValue: any = [];
                data?.forEach((item: any) => {
                  dataTableValue.push({
                    ...item,
                    number: item?.number,
                    id_trans_drafting_wo: item?.id_trans_drafting_wo,
                    action: (
                      <div className="d-flex gap-2">
                        {roleActions?.update && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEdit(item)}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>
                        )}
                    {roleActions?.view && (
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: '#6c757d', color: 'white' }} // Custom gray color for View button
                          onClick={() => handleView(item)}
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                      )}

                      {roleActions?.posting && (
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: '#6c757d', color: 'white' }} // Custom gray color for Posting button
                          onClick={() => handlePosting(item)}
                        >
                          <i className="fas fa-paper-plane"></i> Posting
                        </button>
                      )}

                        {roleActions?.delete && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        )}
                      </div>
                    ),
              
                    progres: (
                      <Badge
                        bg={
                          item?.progres === 'CLOSING WO'
                            ? 'success'
                            : item?.progres === 'MENUNGGU APPROVE SPV'
                            ? 'warning' // Warna kuning untuk MENUNGGU APPROVE SPV
                            : item?.posting_wo === 1
                            ? 'primary' // Warna biru untuk POSTING WO
                            : 'danger'
                        }
                        className="text-white"
                      >
                        {item?.progres === 'CLOSING WO'
                          ? 'CLOSING WO'
                          : item?.progres === 'MENUNGGU APPROVE SPV'
                          ? 'MENUNGGU APPROVE SPV' // Tampilkan teks MENUNGGU APPROVE SPV
                          : item?.posting_wo === 1
                          ? 'POSTING WO' // Tampilkan teks POSTING WO
                          : 'RELEASE WO'}
                      </Badge>
                    ),
                    
                    
        
                       no_wo: item?.no_wo,
                       tgl_wo: item?.tgl_wo,
                       uraian_wo: item?.uraian_wo,
                       id_ref_kegiatan: item?.nama_kegiatan,
                       id_ref_lokasi_up3: item?.nama_up3,
                       id_bidang: item?.nama_bidang,
                       peralatan: item?.peralatan,
                       jns_peralatan: item?.jns_peralatan,
                       id_ref_lokasi_gi: item?.nama_gi,
                       id_ref_lokasi_peralatan: item?.nama_peralatan,
                       foto_sebelum: item?.foto_sebelum
                        ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `<a href="${cdnUrl(item?.foto_sebelum)}" target="_blank" rel="noopener noreferrer" style="color: blue;">${getPathFromUrl(cdnUrl(item?.foto_sebelum))}</a>`,
                            }}
                          />
                        )
                        : '',
                      foto_sesudah: item?.foto_sesudah
                        ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `<a href="${cdnUrl(item?.foto_sesudah)}" target="_blank" rel="noopener noreferrer" style="color: blue;">${getPathFromUrl(cdnUrl(item?.foto_sesudah))}</a>`,
                            }}
                          />
                        )
                        : '',
                       id_user_created: item?.nama_user_created,
                       approve_spv_scada: item?.approve_spv_scada,
                       nama_spv_scada: item?.nama_spv_scada,
                       approve_spv_data: item?.approve_spv_data,
                       nama_spv_data: item?.nama_spv_data,
                       approve_spv_opsis: item?.approve_spv_opsis,
                       nama_spv_opsis: item?.nama_spv_opsis,
                       posting_wo: item?.posting_wo,
       
                })
              });

              setDataRows(dataTableValue)
            }

            

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS("wo-drafting")
    const roleAct = {
    view: ROLE_ACTION(roleAccess, 'view'),
         posting: ROLE_ACTION(roleAccess, 'posting'),
         create: ROLE_ACTION(roleAccess, 'create'),
         update: ROLE_ACTION(roleAccess, 'update'),
         delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    if (!roleAct?.delete && !roleAct?.update) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])



 /** view HANDLING */
 const handleView = (item: any) => {
  setDataSelected(item);
  setModal((prevState: any) => ({
    ...prevState,
    show: true,
  }));
  const params = new URLSearchParams(location.search);
  params.set('id', item.id_trans_drafting_wo || '');
  navigate(`${location.pathname}?${params.toString()}`, { replace: true });
};


const handlePosting = (item: any) => {
  if (item.current?.posting_wo === '1') {
    alert('Data yang sudah diposting tidak bisa diposting kembali.');
    return; // Stop further execution if already posted
  }

  setDataSelected(item);
  setdetailPosting(item?.posting_wo)
  setModalPosting((prevState: any) => ({
    ...prevState,
    show: true,
  }));

  // Add `id` parameter to URL
  const params = new URLSearchParams(location.search);
  params.set('id',item.id_trans_drafting_wo  || '');
  navigate(`${location.pathname}?${params.toString()}`, { replace: true });
};

  const handleAdd = () => {
    // Open the add modal
    setModalAdd((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Remove `id` parameter from URL
    const params = new URLSearchParams(location.search);
    params.delete('id');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleEdit = (item: any) => {
    setDataSelected(item);
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    const params = new URLSearchParams(location.search);
    params.set('id', item.id || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleClose = () => {
    // Close all modals
    setModal((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalAdd((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalPosting((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    // Remove the `id` parameter from the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {/* <CardWidget title="SCADATEL - Drafting - WO Drafting"> */}
  {/* <Row className="gx-1">
    {renderBoxKomulatif}
  </Row> */}

{/* </CardWidget> */}
{/* <br></br>
<br></br> */}

<div className="mt-3">
    <h6 className="progress-title">Keterangan Progres:</h6>
    <div className="progress-container">
      <Badge bg="success" className="progress-badge text-white">
        CLOSING WO
      </Badge>
      
      <Badge bg="danger" className="progress-badge text-white">
        RELEASE WO
      </Badge>
      <Badge bg="primary" className="progress-badge text-white">
        POSTING WO 
      </Badge>
    </div>
  </div>
      <br></br>
      <br></br>
        <>
          <TableDataListActionNEWWW
            add={roleActions?.create}
            columns={columns}
            setColumns={setColumns}
            filterLayout='card'
            onClickAdd={handleAdd}
            title='Fasop - Drafting'
          >

          </TableDataListActionNEWWW>
          <TableData
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
            path={API_PATH().fasop.drafting.wo_drafting}
            primaryKey={'id_trans_drafting_wo'}
            action={action}
            filterParams={{
              sort_by:'tgl_wo',  
              posting_wo_in : ' 0, 1 ,2 '
             }}
            selected={dataSelected}
            // columnFilters={true}
              ids="ids"
            deleteConfirmation
            pagingPresistance={false}
          ></TableData>
          {/* <ModalForm modalProps={modal}>
          <CpointUpload />
        </ModalForm> */}
     <ModalFormWO modalProps={{ ...modal, setShow: handleClose }}>
    
            <WoDraftingViewForm
 
            />
       
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modalAdd, setShow: handleClose }}>
      <WoDraftingForm handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modalPosting, setShow: handleClose }}>
      <WoDraftingPostingForm 
          handleClose={handleClose} 
          dataSelected={dataSelected} 
          isAlreadyPosted={detailPosting}  // Pastikan ini adalah nilai boolean atau null
        />
    </ModalFormWO>


    <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
        <WoDraftingForm handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>
        </>
      

    </>
  );
}
