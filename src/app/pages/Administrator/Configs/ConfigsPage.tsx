import React, { useEffect, useState } from 'react';

/** CONFIG */
import { APP_SETTINGS_JQX, APP_RETENCY_JQX } from '@app/configs/react-table/admin.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';


export default function ConfigsPage() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id: item?.id,
                name: item?.name,
                value: item?.value,
                satuan: item?.satuan,
                group_name: item?.group_name,
                keterangan: item?.keterangan,
                status_data: item?.status_data,
                tipe_data: item?.tipe_data,
            });
        });
        return dataTableValue;
    }

    const handleRespDataApiRetency = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id: item?.id,
                nama_table: item?.nama_table,
                value: item?.value,
                satuan: item?.satuan,
                col_datum: item?.col_datum,
                status: item?.status,
            });
        });
        return dataTableValue;
    }

    const handleCheckedRows = (data: any) => {
        return data;
    }
    const handleCheckedRows2 = (data: any) => {
        return data;
    }

    // Initialize jqxTabs
    useEffect(() => {
        const tabs = document.getElementById('tabs');
        if (tabs) {
            (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
        }

        let roleAccess = ROLE_ACCESS("config-app");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);

    }, []);


    return (
        <>
            <div id="tabs">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Konfigurasi Aplikasi Sync</li>
                    <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li>
                </ul>
                <div key="2">
                    <TableDataJqxGridNew
                        //AKSI 
                        // addbtn={roleActions?.create}
                        showtoolbar={true}
                        editable={roleActions?.update} // Edit on table


                        //TABLE DATA
                        path={API_PATH().admin.settings}
                        filterParams={{}}
                        dataFieldsColsConfig={APP_SETTINGS_JQX()}
                        primaryKey={'id'}
                        respDataApi={handleRespDataApi}

                        filterable={true}
                        selectionmode={'singlerow'}
                        onRowSelected={handleCheckedRows}
                        exportbtn={false}
                    />
                </div>
                <div key="3">
                    <TableDataJqxGridNew
                        //AKSI 
                        // addbtn={roleActions?.create}
                        showtoolbar={true}
                        editable={roleActions?.update} // Edit on table


                        //TABLE DATA

                        path={API_PATH().admin.retency}
                        filterParams={{}}
                        dataFieldsColsConfig={APP_RETENCY_JQX()}
                        primaryKey={'id'}
                        respDataApi={handleRespDataApiRetency}
                        filterable={true}
                        selectionmode={'singlerow'}
                        onRowSelected={handleCheckedRows2}
                        exportbtn={false}
                    />
                </div>
            </div>
        </>
    );
}
