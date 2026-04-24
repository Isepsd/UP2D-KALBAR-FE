import React, { useState, useEffect } from 'react';
/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { Badge, Card, Col, Dropdown, Modal, Row } from 'react-bootstrap';
import WpStatistic from '@app/modules/WorkingManagement/WpStatistic';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import ModalData from '@app/components/Modals/ModalData';
import WmWpPekerja from '@app/modules/WorkingManagement/Pekerja/WmWpPekerja';
import WmWpPekerjaForm from '@app/modules/WorkingManagement/Pekerja/WmWpPekerjaForm';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_PERSETUJUAN_WP } from '@app/configs/workingpermit.config';
import { get } from 'lodash';
import { getAllDownload } from '@app/services/main.service';
import fileDownload from 'js-file-download';
import slugify from 'slugify';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import axios from 'axios';
import Button from '@app/components/Button/Button';
import { setLoading } from '@app/store/reducers/ui';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function WmWorkingPermitPage() {
  const { currentUser } = useSelector((state: any) => state.auth);
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();
  const { closeModal } = useSelector((state: any) => state.ui);
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(WP_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Pekerja`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      // console.log("item", item);

      const status = item?.status_persetujuan;
      const badgeStatus = get(
        STATUS_PERSETUJUAN_WP?.filter((f: any) => f?.value == status),
        '0'
      );

      dataTableValue.push({
        ...item,
        nomor_formulir: (
          <a
            href={`working-permit/wp-detail/${item?.id_wp_online}`}
            target={'_blank'}
            rel='noreferrer'
          >
            {item?.nomor_formulir}
          </a>
        ),
        download: (
          <Button
            variant='primary'
            size='sm'
            onClick={() => handleDownload(item)}
            isLoading={dataSelected?.id_wp_online == item?.id_wp_online}
          >
            Download {dataSelected?.id_wp_online}
          </Button>
        ),
        posting: (
          <>
            {(roleActions?.posting && item?.status_persetujuan === 0) ? <Button variant='success' size='sm' onClick={() => handleApprove(item)}>Posting</Button> : "-"}

          </>
        ),
        bagian: item?.bagian?.name,
        pekerja: (
          <Button variant='' size='sm' onClick={() => handleOpenPekerja(item)}>
            Klik Nama Pekerja
          </Button>
        ),
        status: <Badge bg={badgeStatus?.color}>{badgeStatus?.name}</Badge>,
        pengawas: item?.pengawas?.fullname,
        pengawask3: item?.pengawask3?.fullname,
        manuver: (
          <BadgeStatus
            status={item?.manuver}
            trueMsg='Ya'
            falseMsg='Tidak'
          ></BadgeStatus>
        ),
        grounding: (
          <BadgeStatus
            status={item?.grounding}
            trueMsg='Ya'
            falseMsg='Tidak'
          ></BadgeStatus>
        ),
        action: (
          <>
            {status != 3 && (roleActions?.update || roleActions?.delete) &&
              (item?.status_pekerjaan > 9 || item?.status_persetujuan < 2) && (
                <Dropdown className='hide-toogle hide-focus'>
                  <Dropdown.Toggle variant='light' id={`wpo-act-${index}`}>
                    <i className='fa-solid fa-ellipsis font-weight-bold'></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {roleActions?.update &&
                      < Dropdown.Item onClick={() => handleEdit(item)}>
                        Edit
                      </Dropdown.Item>
                    }
                    {roleActions?.delete &&
                      <Dropdown.Item
                        onClick={() => handleDelete(item)}
                        className='text-danger-hover'
                      >
                        Delete
                      </Dropdown.Item>

                    }
                  </Dropdown.Menu>
                </Dropdown>
              )
            }
          </>
        ),
      });
    });

    setDataRows(dataTableValue);
  };

  /** DOWNLOAD WP */
  const handleDownload = (item: any) => {
    setDataSelected(item);
    getDownloadPdf(item);
  };

  const handleApprove = (item: any) => {
    setDataSelected(item);
    setAction('approve-wp')
  }

  /** EXPORTING DATA */
  const getDownloadPdf = async (item: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    dispatch(setLoading(true))
    try {
      const path: any = `${API_PATH().working_permit.online}/pdf/${item?.id_wp_online
        }`;
      let req: any = await getAllDownload(path, {}, source.token);

      setDataSelected(undefined);
      /** RESET EXPORT */
      const dataBlob = req?.data;
      fileDownload(
        dataBlob,
        `${slugify(
          `WP-${item?.bagian?.name}-${item?.nomor_formulir}-${item?.wp_hirarc?.pekerjaan}`?.toUpperCase()
        )}.pdf`
      );
      dispatch(setLoading(false))
    } catch (err: any) {
      dispatchNotification(`Gagal export / download data`, 'danger');
      dispatch(setLoading(false))
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** OPEN PEKERJA HANDLING */
  const handleOpenPekerja = (item: any) => {
    setDataSelected(item);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit');
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("working-Permit")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      config: ROLE_ACTION(roleAccess, 'config'),
      approve: ROLE_ACTION(roleAccess, 'approve'),
      reject: ROLE_ACTION(roleAccess, 'reject'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
      posting: ROLE_ACTION(roleAccess, 'posting'),
    };
    setRoleActions(roleAct);
  }, []);

  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined);
    }
  }, [closeModal]);

  // console.log("roleActions", roleActions);


  return (
    <>
      {/* STATISTIC  */}
      <Row className='mt-5'>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>STATISTIK</Card.Header>
            <Card.Body>
              <WpStatistic />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* !!END STATISTIC  */}

      <TableDataListAction
        add={roleActions?.create}
        columns={columns}
        setColumns={setColumns}
        spaceTop={1}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().working_permit.online}
        primaryKey={'id_wp_online'}
        approvalAlias={1}
        filterParams={{ sort_by: '-tgl_update', id_user_entri: currentUser?.id_user }}
        selected={dataSelected}
        action={action}
      />

      <ModalData modalProps={modal}>
        <Modal.Body>
          <WmWpPekerjaForm selected={dataSelected}></WmWpPekerjaForm>
          <hr className='my-3' />
          <WmWpPekerja filter={dataSelected}></WmWpPekerja>
        </Modal.Body>
      </ModalData>
    </>
  );
}
