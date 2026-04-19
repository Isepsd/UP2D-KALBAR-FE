import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Dropdown, Button } from 'react-bootstrap'

import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import ModalData from '@app/components/Modals/ModalForm';
import FormChecklistModal from '@app/modules/MasterData/Opsisdis/FormChecklistModal';
import FormChecklistDetailPage from './FormChecklistDetailPage';

import { API_PATH } from '@app/services/_path.service';

import { FORM_CHECKLIST_COLUMN } from '@app/configs/react-table/master-opsisdis.columns.config';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { useSelector } from 'react-redux';

function FormChecklistPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(FORM_CHECKLIST_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();

  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Pemeliharaan`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        nama: item?.nama,
        kategori: item?.ref_aset_jenis?.nama_aset_jenis,
        level: item?.level,
        status: (<BadgeStatus status={item?.status} trueStatus="1"></BadgeStatus>),
        action: (
          <>
            <div className='d-flex align-items-center'>

              <Button onClick={() => setDataSelected(item)} variant='link' size='sm'>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Button>
              <Dropdown className='hide-toogle hide-focus'>
                <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body'>
                  <i className='fa-solid fa-ellipsis font-weight-bold'></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDelete(item)}
                    className='text-danger-hover'
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        )
      });
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  /** ADD HANDLING */
  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  const handleEdit = (item: any) => {
    setDataSelected(item);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

    
  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
      setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card style={{ borderColor: 'var(--success)' }}>
            <Card.Header className='bg-success font-weight-light text-white'>FORM CEKLIS HAR</Card.Header>
            <Card.Body>
              <TableDataListAction
                add={true}
                columns={columns}
                setColumns={setColumns}
                module="Approve ren"
                spaceTop={0}
                onClickAdd={handleAddClick}
              />
              <div className='mb-4'>
                <TableData
                  columnsConfig={dataColumns}
                  respDataApi={handleRespDataApi}
                  rowData={dataRows}
                  path={API_PATH().master.opsisdis.pm.ref_pm}
                  primaryKey={'id_ref_pm'}
                  action={action}
                  onCheckedRows={setDataSelected}
                />
              </div>
            </Card.Body>
            <hr />
            <Card.Body>
              <FormChecklistDetailPage
                itemSelected={dataSelected}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ModalData modalProps={modal} >
        <FormChecklistModal modal={modal} dataSelected={dataSelected} />
      </ModalData>
    </>
  )
}

export default FormChecklistPage