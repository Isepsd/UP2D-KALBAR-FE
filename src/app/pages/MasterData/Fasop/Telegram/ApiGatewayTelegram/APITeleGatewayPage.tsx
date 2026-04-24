import React, { useState, useRef, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

/** CONFIG */
import { API_TEL_GATEWAY_COLUMN } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import NoData from '@app/components/Error/NoData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';

export default function APITeleGatewayPage() {
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState(false);
    const dataSelected = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [dataSrc, setDataSrc] = useState([]);
    const [accordionData, setAccordionData] = useState([]);
    // const [botConfigurations, setBotConfigurations] = useState([]);

    const handleAccordionToggle = (index:any, item:any) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
        if (activeIndex !== index) {
            handleReqs(item);
        }
    };

    const handleRespDataApi = (data:any) => {
        return data?.map((item:any) => ({
            number: item?.number,
            id_wa_kontak: item?.id_wa_kontak,
            nama: item?.nama,
            no_kontak: item?.no_kontak,
            status: item?.status,
        }));
    };

    const handleCheckedRows = (data:any) => {
        dataSelected.current = data;
    };

    const handleReqs = async (item:any) => {
        const { url } = item;
        setLoading(true);
        try {
          // Extract the bot token from the URL
          const botToken = url.match(/bot(.+?)\//)[1];
          
          // Construct the request URL with the bot token
          const requestUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
          const response = await axios.get(requestUrl);
          
          // Assuming response.data.result is an array of updates
          const updates = response.data.result || [];
          
          // Update the data source state with the updates
          setDataSrc(updates);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      
    const getAllData = async () => {
        setLoading(true);
        try {
            const params = {
                page: "1",
                limit: "10",
            };
            const req:any = await getAllByPath(
                API_PATH().master.fasop.tel_bot,
                params,
                source.token
            );
            const { results } = req;
            setAccordionData(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllData();
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <>
            {loading && <TopBarLoader isLoading={loading} />}
            <Row>
                <Col md={12} className="mb-4">
                    <Card className="card-widget">
                        <Card.Header>
                            <h5>List BOT Telegram Gateway for Get Groups Kontak</h5>
                        </Card.Header>
                        <Card.Body>
                            {accordionData.length > 0 ? (
                                <div className="menu-management accordion">
                                    {accordionData.map((item:any, index) => (
                                        <div className="accordion-item" key={index}>
                                            <h2 className="accordion-header">
                                                <button
                                                    className={`accordion-button ${activeIndex === index ? 'active' : ''}`}
                                                    type="button"
                                                    onClick={() => handleAccordionToggle(index, item)}
                                                >
                                                    <i className="fa-brands fa-bots me-2"></i> {item.nama}
                                                </button>
                                            </h2>
                                            <div className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}>
                                                <div className="accordion-body">
                                                    {dataSrc.length > 0 ? (
                                                        <TableDataJqxGridNew
                                                            path={API_PATH().master.fasop.tel_bot}
                                                            dataSources={dataSrc}
                                                            dataFieldsColsConfig={API_TEL_GATEWAY_COLUMN()}
                                                            primaryKey={'groupId'}
                                                            respDataApi={handleRespDataApi}
                                                            filterable={false}
                                                            showtoolbar={false}
                                                            selectionmode={'multiplecellsadvanced'}
                                                            onRowSelected={handleCheckedRows}
                                                            exportbtn={true}
                                                        />
                                                    ) : (
                                                        <div style={{ textAlign: 'center' }}>
                                                            <i className="fa-solid fa-robot" style={{ width: 150 }}></i>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="position-relative">
                                    <NoData />
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
