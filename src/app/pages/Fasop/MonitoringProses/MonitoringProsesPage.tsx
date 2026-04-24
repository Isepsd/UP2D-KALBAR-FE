import { MONITORING_PROSES_COLUMN } from "@app/configs/react-table/fasop/monitoring-proses.column";
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { API_PATH } from "@app/services/_path.service";
import React, { useEffect, useState } from "react";
import { Badge } from 'react-bootstrap';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import Button from '@app/components/Button/Button';
import ModalForm from '@app/components/Modals/ModalForm';
import MonitoringProsesForm from './MonitoringProsesForm';
import { useSelector } from "react-redux";


export default function MonitoringProsesPage() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(MONITORING_PROSES_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const { closeModal } = useSelector((state: any) => state.ui);
  const source = axios.CancelToken.source();
  const [action, setAction] = useState<string>();
  const [dataSelected] = useState<any>();
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: 'Console',
  });
  const [selectedKeterangan, setSelectedKeterangan] = useState<string | undefined>();

  const onShowModal = (console: string) => {
    setModal((prev: any) => ({ ...prev, show: true }));
    setSelectedKeterangan(console);
  };
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    const currentDate = new Date(); // Get the current date

    data?.forEach((item: any) => {
      const tglUpdateProses = item?.tgl_update_proses ? new Date(item.tgl_update_proses) : null;
      const expireRunning = item?.expire_running;

      let statusText: string;
      let badgeColor: string;

      if (tglUpdateProses) {
        // Calculate expiration time in milliseconds
        const expirationTime = expireRunning * 60 * 1000; // Convert minutes to milliseconds

        // Check if the difference between current time and tglUpdateProses is more than 5 minutes
        const isExpired = currentDate.getTime() > tglUpdateProses.getTime() + expirationTime;

        statusText = isExpired ? 'Offline' : 'Online';
        badgeColor = isExpired ? 'danger' : 'success';
      } else {
        // If tgl_update_proses is empty/null, set status to 'Offline' with danger symbol
        statusText = 'Offline';
        badgeColor = 'danger';
      }

      dataTableValue.push({
        ...item,
        name: item?.name,
        tgl_update_proses: item?.tgl_update_proses,
        status_data: (
          <Badge bg={badgeColor} className="text-white">
            {statusText}
          </Badge>
        ),
        group_proses: item?.group_proses,
        expire_running: expireRunning,
        expire_satuan: item?.expire_satuan,
        keterangan: item?.keterangan,
        console: (
          <Button
            disabled={dataSelected?.length === 1}
            className='me-2'
            onClick={() => onShowModal(item?.console)}
          >
            Console
          </Button>
        ),
      });
    });

    setDataRows(dataTableValue);
  };
  

  const handleAddClick = (rowData: any) => {
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
      rowData, // Pass the current row data to the modal
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          keyword: '', // Replace with your actual keyword
          page: 1,
          limit: 10,
        };

        const req: any = await getAllByPath(API_PATH().fasop.laporan_scada.monitoring_proses, params, source.token);

        const { results } = req;
        handleRespDataApi(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const timer = setInterval(() => {
      fetchData();
    }, 30000); // Refresh every 5 seconds (5000 milliseconds)

    // Initial data fetch
    fetchData();

    return () => {
      source.cancel();
      clearInterval(timer);
    };
  }, []);

 
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
 
    setDataColumns(cols);
  }, [columns]);


   /** HANDLE CLOSE MODAL */
   useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])


  return (
    <>
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
        onClickAdd={handleAddClick}
      ></TableDataListAction>

      <TableData
        selected={dataSelected}
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        action={action}
        path={API_PATH().fasop.laporan_scada.monitoring_proses}
        primaryKey={'id'}
        deleteConfirmation
      ></TableData>
    </>
    <ModalForm modalProps={modal}>
        <MonitoringProsesForm dataSelected={dataSelected} console={selectedKeterangan} />
      </ModalForm>
   </>
  );
}
