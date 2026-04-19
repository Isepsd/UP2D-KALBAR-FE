import React, { useState, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { TRANS_FREQUENSI_HISTORY_DETAIL } from '@app/configs/react-table/master-opsisdis.columns.config';
import { getAllByPath, getAllDownload } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { IDirectoryBackupDetail } from '@app/interface/opsisdis-frequensi-backup-detail';
import fileDownload from 'js-file-download';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { useDispatch } from 'react-redux';

import { setActiveFilters } from '@app/store/reducers/ui';

export default function FreBackupHarianPage() {
  /** DATA RESP */
  const url_download: any = API_PATH().opsisdis.frequensi.backup_harian.download;
  const source = axios.CancelToken.source();
  const [filter, setFilter] = useState<any>();
  const [data, setData] = useState<any>([]);
  const [dataRows, setDataRows] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();

  const [columnsDetail] = useState<any>(TRANS_FREQUENSI_HISTORY_DETAIL());
  const [dataColumnsDetail, setDataColumnsDetail] = useState<any>([]);
  const dispatch = useDispatch();

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {

      const req: any = await getAllByPath(API_PATH().opsisdis.frequensi.backup_harian.list_directory, {}, source.token);
      const { results } = req;

      setData(results)

      setLoading(false);


    } catch (err: any) {
      setData([]);
      setLoading(false);
    }
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IDirectoryBackupDetail) => {
      dataTableValue.push({
        number: item.number,
        id: item?.filename,
        filename: item?.filename,
        dokumen: (
          <Button variant='' size='sm' onClick={() => handleDownload(item)}>
            Download
          </Button>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  /** Dwonload HANDLING */
  const handleDownload = (item: any) => {
    getAllDataExport(item)
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */

  useEffect(() => {
    const cols = columnsDetail?.filter(({ show }: any) => show === true);
    setDataColumnsDetail(cols);
  }, [columnsDetail]);

  useEffect(() => {
    getAllData()
    return () => {
      setData(null)
    }
  }, []);

  /** EXPORTING DATA */
  const getAllDataExport = async (item: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
    const params = {
      filepath: filter?.date,
      filename: item?.filename,

    };

    try {
      let req: any = await getAllDownload(
        url_download,
        params,
        source.token
      );

      /** RESET EXPORT */

      const dataBlob = req?.data;
      // const headers = req?.headers;
      // let content: string = headers['content-disposition'];    
      fileDownload(
        dataBlob,
        `Backup_harian__${params?.filepath}_${params?.filename}`
      );
      setLoading(false)
    } catch (err: any) {


      dispatchNotification(`Gagal export / download data`, 'danger');
      setLoading(false);
    }
  };


  const onChangeFolder = (item: any) => {
    setFilter((prevState: any) => {
      return {
        ...prevState,
        date: item?.directory_name
      };
    });
    const active = { filters: { date: item?.directory_name }, count: 1 };
    dispatch(setActiveFilters(active));
  }

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row>
        <Col md={5}>
          <PerfectScrollbar style={{ height: '60vh' }}>
            <Card>
              <Card.Header>
                Folder
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {data?.map((item: any, index: number) =>
                  (
                    <ListGroup.Item className="pointer bg-transparent" key={index} onClick={() => onChangeFolder(item)}>{item?.directory_name}</ListGroup.Item>
                  ))
                  }

                </ListGroup>
              </Card.Body>
            </Card>
          </PerfectScrollbar>
        </Col>
        <Col md={7}>
          {filter &&
            <TableData
              // filterParams={filter}
              columnsConfig={dataColumnsDetail}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={API_PATH().opsisdis.frequensi.backup_harian.list_file}
              primaryKey={'id_ref_aset_lantai'}
              deleteConfirmation
              paging={{ perPage: 50 }}
            />
          }

        </Col>
      </Row>
    </>
  );
}
