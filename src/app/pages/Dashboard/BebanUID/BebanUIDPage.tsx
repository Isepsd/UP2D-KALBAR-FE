import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';
import BebanStaticUID from '@app/modules/Dashboard/BebanStaticUID';
import { API_PATH } from '@app/services/_path.service';
import { head } from 'lodash';
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
import SplineChart from '@app/modules/Highcharts/SplineChart';
import { dateTimeFormat } from '@app/helper/time.helper';
import moment from 'moment';

const tabOptions = [
  { label: 'Jam', value: 'beban_jam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().master.jaringan.ref_lokasi, primaryKey: 'id_ref_lokasi' },
  { label: 'Hari', value: 'beban_hari', format: 'DD/MM/YYYY', pathService: API_PATH().master.jaringan.ref_lokasi, primaryKey: 'id_ref_lokasi' },
  { label: 'Bulan', value: 'beban_bulan', format: 'MM/YYYY', pathService: API_PATH().master.jaringan.ref_lokasi, primaryKey: 'id_ref_lokasi' },
]

export default function KinerjaOpsisPage() {
  const optionsTitle: any = {
    beban_jam: `Beban (MW) Per Jam pada Tanggal ${moment().format("DD MMM YYYY")}`,
    beban_hari: `Beban (MW) Per Hari pada Bulan ${moment().format("MMM YYYY")}`,
    beban_bulan: `Beban (MW) Per Bulan pada Tahun ${moment().format("YYYY")}`
  }
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const [series, setSeries] = useState<any>();
  const [data, setData] = useState<any>();
  const [title, setTitle] = useState<string>(`Beban (MW) Per Jam ${optionsTitle?.beban_jam}`);
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();



  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      const req: any = await getAllByPath(
        API_PATH().dashboard_jabar.beban_grafik,
        {},
        source.token
      );
      const { results } = req;
      setData(results)
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  const setDataSeries = (data: any, config: any) => {
    let series: any = [{
      name: "Beban " + config.label,
      data: []
    }]
    let categories: any = []
    let format = "HH:mm"
    switch (config?.value) {
      case "beban_hari":
        format = "DD"
        break;
      case "beban_bulan":
        format = "MMM"
        break;
    }
    setTitle(optionsTitle[config?.value])
    data[config?.value].map((item: any) => {
      series[0].data.push((item?.beban))
      categories.push(dateTimeFormat(item?.tanggal, "DD-MM-YYYY HH:mm:ss", format))
    })

    setSeries(series)
    setCategories(categories)
  }


  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  useEffect(() => {
    getAllData();
    return () => {
      source.cancel();
      setData(null);
      setSeries(null);
      setCategories(null);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setDataSeries(data, tabActiveConf)
    }
  }, [tabActiveConf, data]);

  useEffect(() => {
    const interval = setInterval(() => getAllData(), 900000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Row className='gx-2 mb-1'>
        {/* LEFT  */}

        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>INFORMASI BEBAN UID JAWA BARAT</Card.Header>
            <Card.Body>
              <BebanStaticUID />
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>GRAFIK BEBAN UID JAWA BARAT</Card.Header>
            <Card.Body>

              <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
                {
                  tabOptions.map((tab: any) => (
                    <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
                  ))
                }
              </Tabs>
            </Card.Body>
            <Card.Body>
              <div className='mb-2' style={{ height: "30rem" }}>
                <SplineChart
                  title={title}
                  categories={categories}
                  series={series}
                  loading={loading}
                  legend={
                    {
                      enabled: false
                      // layout: 'horizontal',
                      // align: 'bottom',
                      // verticalAlign: 'bottom',
                    }
                  }
                />
              </div>
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </>
  );
}
