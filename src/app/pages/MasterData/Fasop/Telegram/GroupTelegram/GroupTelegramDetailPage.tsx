import React, { useRef, useState } from 'react';

/** CONFIG */
import { TELEGRAM_KONTAK_GROUP_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';
// import { IFasopTelegramKontakGroup,  } from '@app/interface/master-data/fasop-telegram-kontak-group.interface';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import GroupTelegramDetailForm from "./GroupTelegramDetailForm";
import ModalForm from "@app/components/Modals/ModalForm";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function GroupTelegramDetailPage({ filterParams }: any) {
    let roleAccess = ROLE_ACCESS("group-telegram");
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
        data?.forEach((item:any) => {
            dataTableValue.push({
                number: item?.number,
                id_tel_group: item?.id_tel_group,
                id_tel_kontak: item?.id_tel_kontak,
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
        id_tel_group: filterParams?.id_tel_group,
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
            {filterParams?.id_tel_group &&
                <TableDataJqxGridNew
                    //AKSI 
                    addbtn={roleActions.create}
                    onClickAdd={handleAddClick}
                    deletebtn={roleActions.delete}

                    //TABLE DATA
                    path={API_PATH().master.fasop.tel_kontak_group}
                    filterParams={filterParams}
                    dataFieldsColsConfig={TELEGRAM_KONTAK_GROUP_COLUMNS()}
                    primaryKey={'id'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

            <ModalForm modalProps={modal}>
                <GroupTelegramDetailForm paramid={filterParams?.id_tel_group} />
            </ModalForm>
        </>
    );
}
