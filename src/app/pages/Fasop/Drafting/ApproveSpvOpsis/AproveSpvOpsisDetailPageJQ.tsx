import React, { useRef} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
/** CONFIG */
import { SCADATEL_WO_DRAFTING_DOKUMEN_GRID } from "@app/configs/react-table/fasop/scadatel-column-drafting";
// import ModalFormWO from "@app/components/Modals/ModalFormWO";
// import AproveSpvScadatelDetailFormJQ from "./AproveSpvScadatelDetailFormJQ"
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function AproveSpvOpsisDetailPageJQ({ filterParams }: any) {
  // const location = useLocation();
  // const navigate = useNavigate();
    // const [roleActions, setRoleActions] = useState<any>({});
    // const [modalUpload, setModalUpload] = useState<any>({
    //   approved: false,
    //   size: "lg",
    //   title: `Upload Data`,
    //   show: false, // Pastikan ini ada
    // });
    
    // const [modalEdit, setModalEdit] = useState<any>({
    //   approved: false,
    //   size: "lg",
    //   title: `Upload Data`,
    //   show: false, // Pastikan ini ada
    // });
    
  //   useEffect(() => {
  //   let roleAccess = ROLE_ACCESS("pelaksanaan-wo");
  //   const roleAct = {
  //     upload: ROLE_ACTION(roleAccess, 'posting'),
  //     delete: ROLE_ACTION(roleAccess, 'delete'),
  //     update: ROLE_ACTION(roleAccess, 'update'),
   
  //   };
  //   setRoleActions(roleAct);
  //   console.log('roleAct', roleAct);
  // }, []);

    const dataSelected = useRef<any>();

    const id_modules = filterParams?.id_modules || null;
  

    const mergedFilterParams = {
   
     id_modules: id_modules,
     
      
   };
    /** MAP DATA FROM API RESPONSE */
const handleRespDataApi = (data: any) => {
  let dataTableValue: any = [];
  // Memfilter data berdasarkan filterParams
      data?.forEach((item: any) => {
          // Saring item berdasarkan filterParams
          // if ((filterParams.id_modules)) {
              dataTableValue.push({
                  number: item?.number,
                  id: item?.id,
                  url: item?.url,
                  description: item?.description,
                  id_modules: item?.id_modules
              });
          // }
      });

  
  return dataTableValue;
};

// const handleEdit = (item: any) => {
//   dataSelected.current = item.current;
//   setModalEdit((prevState: any) => ({
//     ...prevState,
//     show: true,
//   }));

//   // Add `id` parameter to URL
//   const params = new URLSearchParams(location.search);
//   params.set('id', item.current?.id_trans_drafting_wo || '');
//   navigate(`${location.pathname}?${params.toString()}`, { replace: true });
// };


// const handleUpload = () => {
//   // Open the add modal
//   setModalUpload((prevState: any) => ({
//     ...prevState,
//     show: true,
//   }));

//   // Remove `id` parameter from URL
//   const params = new URLSearchParams(location.search);
//   params.delete('id');
//   navigate(`${location.pathname}?${params.toString()}`, { replace: true });
// };

  
// const handleClose = () => {
//   // Close all modals

//   setModalUpload((prevState: any) => ({
//     ...prevState,
//     show: false,
//   }));
 
//   setModalEdit((prevState: any) => ({
//     ...prevState,
//     show: false,
//   }));
 

//   // Remove the `id` parameter from the URL search parameters
//   const searchParams = new URLSearchParams(window.location.search);
//   searchParams.delete('id');
//   const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//   window.history.replaceState({}, '', newUrl);
// };
    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
           {filterParams?.id_modules &&
                <TableDataJqxGridNew
                    // updatebtn={roleActions.update}
                    // onClickUpdate={handleEdit}
                    // deletebtn={roleActions.delete}
                    // SetUpload={roleActions.upload}
                    // onClickSetUpload={handleUpload}
                    path={API_PATH().cdn.cdn}
                    filterParams={ mergedFilterParams}
                    dataFieldsColsConfig={SCADATEL_WO_DRAFTING_DOKUMEN_GRID()}
                    primaryKey={'id_trans_drafting_wo'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
           
              }
           {/* <ModalFormWO modalProps={{ ...modalUpload, setShow: handleClose }}>
      <AproveSpvScadatelDetailFormJQ handleClose={handleClose} filterParams= {id_modules} dataSelected={dataSelected}  />
      </ModalFormWO> */}


           {/* <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
      <AproveSpvScadatelDetailFormJQ handleClose={handleClose} filterParams= {id_modules} dataSelected={dataSelected} />
      </ModalFormWO> */}
        </>
        
    );
}
