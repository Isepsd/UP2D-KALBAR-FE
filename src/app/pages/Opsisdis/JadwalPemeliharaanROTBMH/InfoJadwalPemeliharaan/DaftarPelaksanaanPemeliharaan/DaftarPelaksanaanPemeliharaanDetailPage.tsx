import React, { useRef, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
/** CONFIG */

/** CONFIG */
import { OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN_JQX, OPSISDIS_DOKUMENHAR_COLUMN_JQX } from "@app/configs/react-table/opsisdis.column.config";

import ModalFormWO from "@app/components/Modals/ModalFormWO";
import DaftarPelaksanaanPemeliharaanDetailForm from "./DaftarPelaksanaanPemeliharaanDetailForm"
// import PelaksanaanWoDetailFormEdit from "./PelaksanaanWoDetailFormEdit"
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import InputGarduForm from '../../InputGarduForm';

// import CardWidget from '@app/components/Card/CardWidget';

export default function DaftarPelaksanaanPemeliharaanDetailPage({ filterParams }: any) {
    // const location = useLocation();
    // const navigate = useNavigate();
    const [roleActions, setRoleActions] = useState<any>({});
    const [modalUpload, setModalUpload] = useState<any>({
        approved: false,
        size: "lg",
        title: `Upload Data`,
        show: false, // Pastikan ini ada
    });

    const [modalEdit, setModalEdit] = useState<any>({
        approved: false,
        size: "lg",
        title: `Edit Data`,
        show: false, // Pastikan ini ada
    });

    const [modal2, setModal2] = useState<any>({
        approved: false,
        size: "lg",
        title: `Tambah Gardu`,
        // trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
    });

    const [modaledit2, setModalEdit2] = useState<any>({
        approved: false,
        size: "lg",
        title: `Gardu`,
        // trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
    });



    useEffect(() => {
        let roleAccess = ROLE_ACCESS("daftar-pelaksanaan-har");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, "create"),
            updatedok: ROLE_ACTION(roleAccess, "updatedok"),
            updategar: ROLE_ACTION(roleAccess, "updategar"),
            delete: ROLE_ACTION(roleAccess, "delete"),
            upload: ROLE_ACTION(roleAccess, "upload"),

        };
        setRoleActions(roleAct);
        console.log('roleAct', roleAct);
    }, []);

    const dataSelected = useRef<any>();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() dimulai dari 0
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const trans_jadwal_har_id = filterParams?.trans_jadwal_har_id || null;
    // const id_penyulang = filterParams?.id_penyulang || null;

    const mergedFilterParams = {
        trans_jadwal_har_id: trans_jadwal_har_id,
        // id_penyulang: id_penyulang
    };

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        // Memfilter data berdasarkan filterParams
        data?.forEach((item: any) => {
            // Saring item berdasarkan filterParams
            if (item?.trans_jadwal_har_id === filterParams?.trans_jadwal_har_id) {
                dataTableValue.push({
                    number: item?.number,
                    trans_jadwal_har_id: item?.trans_jadwal_har_id,
                    trans_jadwal_har_dok_id: item?.trans_jadwal_har_dok_id,
                    nama_dok: item?.nama_dok,
                    nama_file: item?.nama_file,
                    created_at: formatDate(item?.created_at),
                });
            }
        });


        return dataTableValue;
    };
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApigar = (data: any) => {
        let dataTableValue: any = [];
        // Memfilter data berdasarkan filterParams
        data?.forEach((item: any) => {
            if (item?.trans_jadwal_har_id === filterParams?.trans_jadwal_har_id) {
                dataTableValue.push({
                    number: item?.number,
                    trans_jadwal_har_gardu_id: item?.trans_jadwal_har_gardu_id,
                    trans_jadwal_har_id: item?.trans_jadwal_har_id,
                    gardu: item?.gardu?.nama_lokasi,
                    penyulang: item?.gardu?.nama_penyulang?.nama_lokasi,
                    gardu_induk: item?.gardu?.nama_gardu_induk?.nama_lokasi,
                    up3_1: item?.gardu?.nama_up3_1?.nama_lokasi,
                    alamat: item?.gardu?.alamat,
                });
            }
        });



        return dataTableValue;
    };

    // const handleEdit = (item: any) => {
    //     dataSelected.current = item.current;
    //     setModalEdit((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));

    //     // Add `id` parameter to URL
    //     const params = new URLSearchParams(location.search);
    //     params.set('id', item.current?.id || '');
    //     navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    // };


    // const handleUpload = () => {
    //     // Open the add modal
    //     setModalUpload((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));

    //     // Remove `id` parameter from URL
    //     const params = new URLSearchParams(location.search);
    //     params.delete('id');
    //     navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    // };

    // const handleAddClick2 = () => {
    //     setModal2((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));

    //     // Remove `id` parameter from URL
    //     const params = new URLSearchParams(location.search);
    //     params.delete('id');
    //     navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    // };

    // /** HANDLE EDIT */
    // const handleEditClick2 = (item: any) => {

    //     dataSelected.current = item.current;
    //     setModalEdit2((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));

    //     // Add `id` parameter to URL
    //     const params = new URLSearchParams(location.search);
    //     params.set('id', item.current?.id || '');
    //     navigate(`${location.pathname}?${params.toString()}`, { replace: true });

    // };

    const handleClose = () => {
        // Close all modals

        setModal2((prevState: any) => ({
            ...prevState,
            show: false,
        }));

        setModalEdit2((prevState: any) => ({
            ...prevState,
            show: false,
        }));
        setModalUpload((prevState: any) => ({
            ...prevState,
            show: false,
        }));

        setModalEdit((prevState: any) => ({
            ...prevState,
            show: false,
        }));


        // Remove the `id` parameter from the URL search parameters
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete('id');
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
    };
    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {roleActions.view && roleActions.create && roleActions.updatedok && roleActions.updategar && roleActions.delete ? (
                <>
                    <JqxTabs theme='light'>
                        <ul style={{ marginLeft: 10 }} key="1">
                            <li>
                                <i className="fa fa-file"></i> Gardu Pemeliharaan
                            </li>
                            <li>
                                <i className="fa fa-file"></i> Upload Dokumen
                            </li>
                        </ul>
                        <div key="2">
                            <TableDataJqxGridNew
                                // addbtn={roleActions.create}
                                // onClickAdd={handleAddClick2}
                                // updatebtn={roleActions.updategar}
                                // onClickUpdate={handleEditClick2}
                                // deletebtn={roleActions.delete}
                                path={API_PATH().opsisdis.jadwal_pemeliharaan.gardu}
                                filterParams={mergedFilterParams}
                                dataFieldsColsConfig={OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN_JQX()}
                                primaryKey={'trans_jadwal_har_gardu_id'}
                                respDataApi={handleRespDataApigar}
                                filterable={true}
                                onRowSelected={handleRowSelected}
                                exportbtn={false}
                                reloadbtn={true}
                            />
                        </div>

                        <div key="3">
                            <TableDataJqxGridNew
                                // updatebtn={roleActions.updatedok}
                                // onClickUpdate={handleEdit}
                                // deletebtn={roleActions.delete}
                                // SetUpload={roleActions.upload}
                                // onClickSetUpload={handleUpload}
                                path={API_PATH().opsisdis.jadwal_pemeliharaan.dok}
                                filterParams={mergedFilterParams}
                                dataFieldsColsConfig={OPSISDIS_DOKUMENHAR_COLUMN_JQX()}
                                primaryKey={'trans_jadwal_har_dok_id'}
                                respDataApi={handleRespDataApi}
                                filterable={true}
                                onRowSelected={handleRowSelected}
                                exportbtn={false}
                            />
                        </div>
                    </JqxTabs>

                    <ModalFormWO modalProps={{ ...modalUpload, setShow: handleClose }}>
                        <DaftarPelaksanaanPemeliharaanDetailForm
                            handleClose={handleClose}
                            trans_jadwal_har_id={trans_jadwal_har_id}
                        />
                    </ModalFormWO>

                    <ModalFormWO modalProps={{ ...modal2, setShow: handleClose }}>
                        <InputGarduForm
                            handleClose={handleClose}
                            trans_jadwal_har_id={trans_jadwal_har_id}
                        // id_penyulang={id_penyulang}
                        />
                        <ModalFormWO modalProps={{ ...modaledit2, setShow: handleClose }}>
                            <InputGarduForm
                                handleClose={handleClose}
                                trans_jadwal_har_id={trans_jadwal_har_id}
                            />
                        </ModalFormWO>
                    </ModalFormWO>

                    <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
                        <DaftarPelaksanaanPemeliharaanDetailForm
                            handleClose={handleClose}
                            trans_jadwal_har_id={trans_jadwal_har_id}
                        />
                    </ModalFormWO>
                </>
            ) : null}
        </>
    )
}
