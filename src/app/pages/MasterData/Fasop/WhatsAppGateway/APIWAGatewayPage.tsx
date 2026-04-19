import React, { useState, useRef, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

/** CONFIG */
import { API_WA_GATEWAY_COLUMN } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import NoData from '@app/components/Error/NoData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import moment from 'moment';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';


export default function APIWAGatewayPage() {
    // let roleAccess = ROLE_ACCESS("kontak-whatsapp");
    // const roleActions = {
    //     view: ROLE_ACTION(roleAccess, 'view'),
    //     create: ROLE_ACTION(roleAccess, 'create'),
    //     update: ROLE_ACTION(roleAccess, 'update'),
    //     delete: ROLE_ACTION(roleAccess, 'delete'),
    // };
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState<boolean>(false);
    const dataSelected = useRef<any>();
    const [accordionData, setAccordionData] = useState<any>([]);
    const [dataSrc, setDataSrc] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const handleAccordionToggle = (index: number, item: any) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
        if (activeIndex === index) {
            // Accordion is being closed, no action needed
        } else {
            // Accordion is being opened, call handleReqs with the item data
            handleReqs(item);
        }
    };

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                id_wa_kontak: item?.id_wa_kontak,
                nama: item?.nama,
                no_kontak: item?.no_kontak,
                status: item?.status,
            });
        });
        return dataTableValue;
    }

    const handleCheckedRows = (data: any) => {
        dataSelected.current = data;
    }

    const handleReqs = async (item: any) => {
        let url = item.url;
        let token = item.token;
        let instance_id = item.instance_id;
        let routes = 'instances/whatsapp/get-groups';
        setLoading(true);
        const trimmedUrl = url.substring(0, url.indexOf('message/whatsapp/'));
        const requestUrl = `${trimmedUrl}${routes}?instances_id=${instance_id}&token=${token}`;

        axios.get(requestUrl)
            .then(response => {
                let results = response.data.data
                // console.log('apa ini', response.data);
                const modifiedResults = results.map((result: any) => ({
                    ...result, datum: moment.unix(result?.created_at).format('YYYY-MM-DD HH:mm:ss')
                }));
                setDataSrc(modifiedResults);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

    };

    // Get data toket
    const getAllData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const params = {
            page: "-1",
            limit: "-1"
        };
        setLoading(true);
        try {
            const req: any = await getAllByPath(API_PATH().master.fasop.whatsapp.bot, params, source.token);

            const { results } = req;
            setAccordionData(results);
            setLoading(false);
        } catch (err: any) {
            setLoading(false)
        }
    };

    useEffect(() => {
        getAllData();
        return () => {
            source.cancel();
        }
    }, []);



    return (
        <>
            <TopBarLoader isLoading={loading} />
            <Row>
                <Col md={12} className='mb-4'>
                    <Card className='card-widget'>
                        <Card.Header ><h5>List BOT WA Gateway for Get Groups Kontak</h5></Card.Header>
                        <Card.Body>
                            {accordionData.length > 0 && (
                                <div className="menu-management accordion">
                                    {accordionData.map((item: any, index: any) => (
                                        <div className="accordion-item" key={index}>
                                            <h2 className="accordion-header">
                                                <button className={`accordion-button ${activeIndex === index ? 'active' : ''}`} type="button" onClick={() => handleAccordionToggle(index, item)}>
                                                    <i className="fa-brands fa-bots me-2"></i> {item.nama}
                                                </button>
                                            </h2>
                                            <div className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`} >
                                                <div className="accordion-body">
                                                    {dataSrc.length > 0 && (
                                                        <TableDataJqxGridNew
                                                            //AKSI

                                                            //TABLE DATA
                                                            path={API_PATH().master.fasop.whatsapp.bot}
                                                            dataSources={dataSrc}
                                                            dataFieldsColsConfig={API_WA_GATEWAY_COLUMN()}
                                                            primaryKey={'groupId'}
                                                            respDataApi={handleRespDataApi}
                                                            filterable={false}
                                                            showtoolbar={false}
                                                            virtualmode={false}
                                                            sortable={false}
                                                            selectionmode={'multiplecellsadvanced'}
                                                            onRowSelected={handleCheckedRows}
                                                            exportbtn={true}
                                                        />
                                                    )}

                                                    {dataSrc.length === 0 && (
                                                        <>
                                                            <div style={{ textAlign: 'center' }}>
                                                                <i className="fa-solid fa-robot" style={{ width: 150 }}></i>
                                                            </div>
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {accordionData?.length === 0 && (
                                <div className='position-relative'>
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
