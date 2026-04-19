import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import ModalRejectWP from '@app/components/Modals/ModalRejectWP'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_APPROVAL_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import WpStatistic from '@app/modules/WorkingManagement/WpStatistic';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { STATUS_PERSETUJUAN_WP } from '@app/configs/workingpermit.config';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function ApprovalAssmentPage() {
  const { closeModal } = useSelector((state: any) => state.ui);
  const navigate = useNavigate()
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(WP_APPROVAL_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const [modalRejectWP, setModalRejectWP] = useState<any>({
    show: false,
    approved: false,
    size: 'md',
    description: 'Reject WP',
    textApproved: 'Save',
    classApproved: 'primary',
    textDecline: 'Cancel',
    data: undefined,
    statusPersetujuan: 0
  });
  const [dataSelected, setDataSelected] = useState<any>();
  const [triggers, setTriggers] = useState<any>();
  const [action, setAction] = useState<string>();
  const { currentUser } = useSelector((state: any) => state.auth);
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      const status = item?.status_persetujuan
      const badgeStatus = get(STATUS_PERSETUJUAN_WP?.filter((f: any) => f?.value == status), '0')

      dataTableValue.push({
        ...item,
        approve: (
          <>
            {roleActions?.approve ? <Button variant='primary' size='sm' onClick={() => handleApprove(item)}>Approve</Button> : "Not Access"}

          </>
        ),
        reject: (
          <>
            {roleActions?.approve ? <Button variant='outline-danger' size='sm' onClick={() => handleReject(item)}>Reject</Button> : "Not Access"}
          </>
        ),
        // approve: <Button variant='primary' size='sm' onClick={() => handleApprove(item)}>Approve</Button>,
        // reject: <Button variant='outline-danger' size='sm' onClick={() => handleReject(item)}>Reject</Button>,
        bagian: item?.bagian?.name,
        pengawas: item?.pengawas?.fullname,
        pengawask3: item?.pengawask3?.fullname,
        pekerjaan_dilakukan: <Link to={`detail/${item?.id_wp_online}`}>{item?.pekerjaan_dilakukan}</Link>,
        manuver: (
          <BadgeStatus
            status={item?.manuver}
            trueMsg='Ya'
            falseMsg='Tidak'
          ></BadgeStatus>
        ),
        status: <Badge bg={badgeStatus?.color}>{badgeStatus?.name}</Badge>,
        grounding: (
          <BadgeStatus
            status={item?.grounding}
            trueMsg='Ya'
            falseMsg='Tidak'
          ></BadgeStatus>
        ),
        detail: <Button variant='' size='sm' onClick={() => handleDetailClick(item)}>Detail</Button>,
      });
    });

    setDataRows(dataTableValue);
  };

  const handleDetailClick = (item: any) => {
    navigate(`detail/${item?.id_wp_online}`)
  }

  const handleApprove = (item: any) => {
    setDataSelected(item);
    setAction('approve-wp')
  }

  const handleReject = (item: any) => {
    setDataSelected(item);
    setModalRejectWP((prevState: any) => ({ ...prevState, show: true, data: item }));
  }

  const callbackTrigger = (timestamp: any) => setTriggers(timestamp);

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("approval-assessment")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      config: ROLE_ACTION(roleAccess, 'config'),
      approve: ROLE_ACTION(roleAccess, 'approve'),
      reject: ROLE_ACTION(roleAccess, 'reject'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
      detail: ROLE_ACTION(roleAccess, 'detail'),
    };
    setRoleActions(roleAct);
  }, []);

  return (
    <>
      {/* STATISTIC  */}
      <Row className='mt-4'>
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
        add={false}
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
        action={action}
        selected={dataSelected}
        trigger={triggers}
        approvalAlias={3}
        filterParams={{ sort_by: '-id_wp_online', status_persetujuan: '2', id_user_asman: currentUser?.id_user }}
        deleteConfirmation
      />

      <ModalRejectWP
        modalRejectWPProps={modalRejectWP}
        callbackTrigger={callbackTrigger}
      />
    </>
  );
}
