import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CardWidget from '@app/components/Card/CardWidget';
moment.locale('id')


/** SERVICE */
import { useSelector } from 'react-redux';
// import AreaSplineChart from '@app/modules/Highcharts/AreaSpline';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import { mappingLineChart, mappingLineChartPerjam } from '@app/helper/mappingChart.helper';
import {  Tab, Tabs } from 'react-bootstrap';
import BarChart from '@app/modules/Highcharts/BarChart';


export default function ChartlaporanBeban({
  page = "",
  path,
  format,
  watchJenisKeterangan
}: IChartlaporanBeban) {
  /** DATA RESP */
  const tabOptionsUnit = [
    {  value: 'a' },
    // { label: 'A', value: 'a' },
    // { label: 'V', value: 'v' },
  ]
  const [seriesChart, setSeriesChart] = useState<any>([]);
  // const [resultChart, setResultChart] = useState<any>();
  const [categoryChart, setCategoryChart] = useState<any>([]);
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );

  const [loading, setLoading] = useState<boolean>();
  const source = axios.CancelToken.source();
  const [watchJenisKeteranganUnit, setTabActiveUnit] = useState<string>(tabOptionsUnit[0].value)
  const [optionsUnit] = useState<any>()

  /** COLUMN SHOW HIDE EVENT HANDLE */

  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
    try {
      const params = {
        page: -1,
        limit: -1,
        keyword: null,
        ...activeFilters?.filters,
        year_before: activeFilters?.filters?.year_before ? activeFilters?.filters?.year_before + "-01-01" : undefined,
        year_after: activeFilters?.filters?.year_after ? activeFilters?.filters?.year_after + "-01-01" : undefined,
        month_before: activeFilters?.filters?.month_before ? activeFilters?.filters?.month_before + "-01" : undefined,
        month_after: activeFilters?.filters?.month_after ? activeFilters?.filters?.month_after + "-01" : undefined,
        sort_by: "datum"
      };

      delete params.datum_befores
      delete params.datum_afters

     
     
      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results.map((d: any,) => {
          return d;
        });
        setSeriesChartResult(data);

      } else {
        setSeriesChartResult([]);
      }
      setLoading(false);

    } catch (err: any) {
      // setRespData([]);
      setLoading(false);
    }
  };

  const setSeriesChartResult = (data: any) => {
    let result: any = []
    if (watchJenisKeterangan === 'beban_perjam') {
      result = mappingLineChartPerjam(data, moment);
    } else {
      result = mappingLineChart(data, moment, format);
    }

    let columnChart: any = watchJenisKeteranganUnit;
   
    setSeriesChart(result?.res[columnChart]);
    setCategoryChart(result?.cat);

 
   
  }

  useEffect(() => {
    getAllData()
    return () => {
      source.cancel()
    }
  }, [activeFilters, path, watchJenisKeteranganUnit])




  return (
    <div className='px-4'>
      {page != "opsis-tegangan-gi" && page != "laporan-beban-subsistem" && page != "laporan-beban-up3" && page != "laporan-beban-up2b" && page != "laporan-beban-uid" &&
        <Tabs variant="pills" defaultActiveKey="a" activeKey={watchJenisKeteranganUnit} onSelect={(k: any) => setTabActiveUnit(k)} className="mb-2 tab-sm mt-3 ">
          {
            optionsUnit?.map((tab: any) => (
              <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
            ))
          }
        </Tabs>
      }

     
<CardWidget title='Frekuensi Bangka'>
      <div style={{ height: '20rem' }}>
        <BarChart series={seriesChart}
          categories={categoryChart}
          loading={loading}
           type='column' />
      </div>

  </CardWidget>
     
    </div >
    
  );
}

interface IChartlaporanBeban {
  path?: any
  page?: any
  format: any
 
  watchJenisKeterangan:string
}