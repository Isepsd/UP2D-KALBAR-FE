import React, { useState, useEffect } from 'react';
import { cdnUrl } from '@app/helper/cdn.helper';
/** CONFIG */
import { SCADATEL_WO_APPROVE_BIDANG } from "@app/configs/react-table/fasop/scadatel-column-drafting";

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListActionNEWWW from '@app/modules/Table/TableDataListActionNEWWW';
import ModalFormWO from '@app/components/Modals/ModalFormWO';
import AproveSpvScadatelFormView from "./AproveSpvBidangFormView"
import AproveSpvBidangFormApproveJQ from './AproveSpvBidangFormApproveJQ'
import AproveSpvBidangDetailPageJQ from './AproveSpvBidangDetailPageJQ'
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
import { Badge, Card, Col, Row } from 'react-bootstrap';
// import CardWidget from '@app/components/Card/CardPage';
import { get } from 'lodash';

export default function FasPointAnalogDigitalPage() {
  const { closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
const { currentUser } = useSelector((state: any) => state.auth);
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
 const [detailAprove,setdetailApprove] = useState<any>();
  const [detailAlreadyAprove,setdetailAlreadyApprove] = useState<any>();
  const [columns, setColumns] = useState<any>(SCADATEL_WO_APPROVE_BIDANG());
  const [dataColumns, setDataColumns] = useState<any>([]);
   const [detailsModuleWO, setDetailsModuleWO] = useState<any>();

     
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
  const [modalApprove, setModalApprove] = useState<any>({
    approved: false,
    size: "l",
    title: `Pelaksaan WO`,
  });
  // const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);
 
const [filterValues] = useState<any>({
  id_user_mulai_wo: String(currentUser.id_user)

});
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
        
         {roleActions?.view && (
            <button
              className="btn btn-sm"
              style={{ backgroundColor: '#6c757d', color: 'white' }} // Custom gray color for View button
              onClick={() => handleApprove(item)}
            >
            <i className="fas fa-check-square"></i> Approve
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
           
          </div>
        ),
  
                        progres: (
                          <Badge
                            bg={
                              item?.progres === 'CLOSING WO'
                                ? 'success'
                                : item?.progres === 'MENUNGGU APPROVE SPV'
                                ? 'warning'  // Warna kuning untuk MENUNGGU APPROVE SPV
                                : 'danger'
                            }
                            className="text-white"
                          >
                            {item?.progres === 'CLOSING WO'
                              ? 'CLOSING WO'
                              : item?.progres === 'MENUNGGU APPROVE SPV'
                              ? 'MENUNGGU APPROVE SPV'  // Tampilkan teks MENUNGGU APPROVE SPV
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

  
  const handleSelectedRows = (v: any) => {
    const selected = get(v, "0");
    if (selected) {
      setDetailsModuleWO({
        id_trans_drafting_wo: selected.id_trans_drafting_wo,
      });
     
    }
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
 const handleApprove = (item: any) => {

  setDataSelected(item);
  setdetailApprove(item?.posting_wo);
  setdetailAlreadyApprove(item?.approve_spv_data);
  setModalApprove((prevState: any) => ({
    ...prevState,
    show: true,
  }));

  // Add `id` parameter to URL
  const params = new URLSearchParams(location.search);
  params.set('id', item.id_trans_drafting_wo || '');
  navigate(`${location.pathname}?${params.toString()}`, { replace: true });
};


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


 
const handleClose = () => {
  // Close all modals
  setModal((prevState: any) => ({
    ...prevState,
    show: false,
  }));
  setModalApprove((prevState: any) => ({
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
      {/* <CardWidget title="SCADATEL - Drafting - WO Drafting">
  <Row className="gx-1">
    {renderBoxKomulatif}
  </Row>
 
</CardWidget> */}

<div className="mt-3">
    <h6 className="progress-title">Keterangan Progres:</h6>
    <div className="progress-container">
      <Badge bg="success" className="progress-badge text-white">
        CLOSING WO
      </Badge>
      <Badge bg="warning" className="progress-badge text-white">
        MENUNGGU APPROVE SPV
      </Badge>
    
    </div>
  </div>

      <br></br>
      <br></br>
        <>
          <TableDataListActionNEWWW
            add={false}
            columns={columns}
            setColumns={setColumns}
            filterLayout='card'
          
            title='Fasop - Drafting'
          >

          </TableDataListActionNEWWW>
          <TableData
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
            rowSelect={true}
            rowSelectType={'radio'}
            onCheckedRows={handleSelectedRows}
            primaryKey={'id_trans_drafting_wo'}
            action={action}
            path={API_PATH().fasop.drafting.wo_drafting}
            filterParams={ {
              sort_by:'tgl_wo',  
              posting_wo: '4'
            }}   // Filter untuk posting_wo 1, 3, dan 4
            selected={dataSelected}
            // columnFilters={true}
              ids="ids"
            deleteConfirmation
            pagingPresistance={false}
          ></TableData>

          <hr className='my-4' />
         <Row>
                         <Col md={12} className='mb-4'>
                             <Card className='card-widget'>
                                 <Card.Header > Dokumen Perkejaan  {dataSelected?.current?.detailsModuleWO}</Card.Header>
                                 <AproveSpvBidangDetailPageJQ
                                 filterParams={{ id_modules: detailsModuleWO?.id_trans_drafting_wo }}
                                />
                             </Card>
                         </Col>
                     </Row>
                 
        
          {/* <ModalForm modalProps={modal}>
          <CpointUpload />
        </ModalForm> */}
   {modalApprove.show && (
      <ModalFormWO modalProps={{ ...modalApprove, setShow: handleClose }}>
        <AproveSpvBidangFormApproveJQ 
         handleClose={handleClose} 
         dataSelected={dataSelected} 
         isAlreadyPelaksanaan={detailAprove}  // Pastikan ini adalah nilai boolean atau null
         isAlreadyApprove={detailAlreadyAprove}  // Pastikan ini adalah nilai boolean atau null
         id_spv_data={filterValues}
        />
      </ModalFormWO>
 )}
      <ModalFormWO modalProps={{ ...modal, setShow: handleClose }}>
      {modal.show && (
            <AproveSpvScadatelFormView
                handleClose={() => setModal({ show: false })}
            />
        )}
      </ModalFormWO>
    
        </>
      

    </>
  );
}
