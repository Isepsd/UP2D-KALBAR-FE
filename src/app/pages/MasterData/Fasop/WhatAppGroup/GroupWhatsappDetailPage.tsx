import React, { useRef, useState } from 'react';

/** CONFIG */
import { WHATSAPP_KONTAK_GROUP_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import GroupWhatsappDetailForm from "./GroupWhatsappDetailForm";
import ModalForm from "@app/components/Modals/ModalForm";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function GroupWhatsappDetailPage({ filterParams }: any) {
    let roleAccess = ROLE_ACCESS("group-portal");
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
                id_wa_group: item?.id_wa_group,
                id_wa_kontak: item?.id_wa_kontak,
                nama_kontak: item?.kontak?.nama,
                no_kontak: item?.kontak?.no_kontak,
                id: item?.id,
            });
        });
        return dataTableValue;
    }

    const [modal, setModal] = useState<any>({
        approved: false,
        size: "lg",
        title: `Tambah Kontak`,
        id_wa_group: filterParams?.id_wa_group,
    });

    /** HANDLE ADD */
    const handleAddClick = () => {
        setModal((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.id_wa_group &&
                <TableDataJqxGridNew
                    //AKSI 
                    addbtn={roleActions.create}
                    onClickAdd={handleAddClick}
                    deletebtn={roleActions.delete}

                    //TABLE DATA
                    path={API_PATH().master.fasop.whatsapp.kontak_group}
                    filterParams={filterParams}
                    dataFieldsColsConfig={WHATSAPP_KONTAK_GROUP_COLUMNS()}
                    primaryKey={'id'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

            <ModalForm modalProps={modal}>
                <GroupWhatsappDetailForm paramid={filterParams?.id_wa_group} />
            </ModalForm>
        </>
    );
}
