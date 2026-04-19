import React, { useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { WHATSAPP_BOT_COLUMNS_JQ } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function BotWhatsappPage() {
    let roleAccess = ROLE_ACCESS("bot-whatsapp");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                nama: item?.nama,
                url: item?.url,
                token: item?.token,
                instance_id: item?.instance_id,
                status: item?.status,
            });
        });
        return dataTableValue;
    }

    const handleCheckedRows = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            <JqxTabs theme="light">t
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> WhatsApp Bot</li>
                </ul>
                <div key="2">
            <TableDataJqxGridNew
                //AKSI 
                addbtn={roleActions.create}
                updatebtn={roleActions.update}
                deletebtn={roleActions.delete}

                //TABLE DATA
                path={API_PATH().master.fasop.whatsapp.bot}
                filterParams={{}}
                dataFieldsColsConfig={WHATSAPP_BOT_COLUMNS_JQ()}
                primaryKey={'id_wa_bot'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={true}
            />            
            </div>
        </JqxTabs>
        </>
    );
}
