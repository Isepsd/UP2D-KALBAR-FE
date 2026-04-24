import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_APPROVAL_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { Badge, Button, Card, Col, Modal, Row } from 'react-bootstrap';
import WpStatistic from '@app/modules/WorkingManagement/WpStatistic';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import ModalData from '@app/components/Modals/ModalData';
import WmWpPekerja from '@app/modules/WorkingManagement/Pekerja/WmWpPekerja';
import WmWpPekerjaForm from '@app/modules/WorkingManagement/Pekerja/WmWpPekerjaForm';
import { useSelector } from 'react-redux';
import { STATUS_PERSETUJUAN_WP } from '@app/configs/workingpermit.config';
import { get } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

export default function WmWorkingPermitViewDataPage() {
  const navigate = useNavigate()
  const { closeModal } = useSelector((state: any) => state.ui);
  const { status } = useParams();
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(WP_APPROVAL_COLUMNS()?.filter((f: any) => f?.accessor != 'approve' && f?.accessor != 'reject'));
  const [dataColumns, setDataColumns] = useState<any>([]);

  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Pekerja`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      const status = item?.status_persetujuan
      const badgeStatus = get(STATUS_PERSETUJUAN_WP?.filter((f: any) => f?.value == status), '0')

      dataTableValue.push({
        ...item,
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
          <BadgeStatus status={item?.manuver} trueMsg="Ya" falseMsg="Tidak"></BadgeStatus>
        ),
        grounding: (
          <BadgeStatus status={item?.grounding} trueMsg="Ya" falseMsg="Tidak"></BadgeStatus>
        ),
        detail: <Button variant='' size='sm' onClick={() => handleDetailClick(item)}>Detail</Button>,
      });
    });

    setDataRows(dataTableValue);
  };


  const handleDetailClick = (item: any) => {
    navigate(`/wm/detail-view/${item?.id_wp_online}`)
  }

  /** DELETE HANDLING */
  const handleOpenPekerja = (item: any) => {
    setDataSelected({
      ...item
    });
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

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
        filterParams={{
          sort_by: '-tgl_update',
          status_pekerjaan: status != "-1" ? status : null
        }}
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
