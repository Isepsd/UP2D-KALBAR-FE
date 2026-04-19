import React, { useEffect } from 'react';

/** CONFIG */
import { INTEGRASI_MON_COLUMN_JQ, } from"@app/configs/react-table/apkt.columns.config";
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';


export default function TableIntegrasiMonJQ() {
    // const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
         number: item?.number,
         nama_proses:item?.nama_proses,
         tgl_update:item?.tgl_update,
         status:item?.status,

            });
        });
        return dataTableValue;
    }



    const handleCheckedRows = (data: any) => {
        return data;
    }
   
    // Initialize jqxTabs
    useEffect(() => {
        const tabs = document.getElementById('tabs');
        if (tabs) {
            (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
        }

        let roleAccess = ROLE_ACCESS("monitoring");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        // setRoleActions(roleAct);
        console.log('roleAct', roleAct);

    }, []);


    return (
        <>
                <div key="2">
                    <TableDataJqxGridNew 
                        // exportbtn={roleActions.exportbtn}
                        //TABLE DATA
                        path={API_PATH().apkt.apkt_integrasi_mon}
                        filterParams={{
                            sort_by: "-nama_proses",
                            page: "-1",
                            limit: "-1"
                          }} 
                          dataFieldsColsConfig={INTEGRASI_MON_COLUMN_JQ()}
                        primaryKey={'id'}
                        respDataApi={handleRespDataApi}
                        onRowSelected={handleCheckedRows}
                    />
                </div>

           
        </>
    );
}
