import React, { useState, useEffect } from 'react';
import moment from 'moment';
moment.locale('id')


/** SERVICE */
import { useSelector } from 'react-redux';
// import AreaSplineChart from '@app/modules/Highcharts/AreaSpline';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import { mappingLineChart, mappingLineChartLoadFactor, mappingLineChartPerjam } from '@app/helper/mappingChart.helper';
import { Card, Tab, Tabs } from 'react-bootstrap';
import SplineChart from '@app/modules/Highcharts/SplineChart';
import AreaSplineChart from '@app/modules/Highcharts/AreaSpline';

export default function ChartlaporanBeban({
  page = "",
  path,
  format,
  tabActive
}: IChartlaporanBeban) {
  /** DATA RESP */
  const tabOptionsUnit = [
    { label: 'MW', value: 'mw' },
    { label: 'A', value: 'a' },
    { label: 'V', value: 'v' },
  ]
  const [seriesChart, setSeriesChart] = useState<any>([]);
  // const [resultChart, setResultChart] = useState<any>();
  const [categoryChart, setCategoryChart] = useState<any>([]);
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );
  const [seriesChartLoadFactor, setSeriesChartLoadFactor] = useState<any>([]);
  const [categoryChartLoadFactor, setCategoryChartLoadFactor] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();
  const source = axios.CancelToken.source();
  const [tabActiveUnit, setTabActiveUnit] = useState<string>(tabOptionsUnit[0].value)
  const [optionsUnit, setOptionsUnit] = useState<any>()

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

      switch (tabActive) {
        case "beban_perjam":
          // delete params.year_before
          // delete params.year_after

          delete params.month_after
          delete params.month_before
          delete params.day_after
          delete params.day_before
          break;
        case "beban_harian":
          // delete params.year_before
          // delete params.year_after

          delete params.month_after
          delete params.month_before
          delete params.datum_after
          delete params.datum_before
          break;
        case "beban_bulanan":
          // delete params.year_before
          // delete params.year_after

          delete params.day_after
          delete params.day_before
          delete params.datum_after
          delete params.datum_before
          break;
        case "beban_tahunan":
          delete params.day_before
          delete params.day_after

          delete params.month_after
          delete params.month_before
          delete params.datum_after
          delete params.datum_before
          break;

        default:
          break;
      }

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
    if (tabActive === 'beban_perjam') {
      result = mappingLineChartPerjam(data, moment);
    } else {
      result = mappingLineChart(data, moment, format);
    }

    let columnChart: any = tabActiveUnit;
    switch (page) {
      case "laporan-beban-subsistem":
      case "laporan-beban-up3":
      case "laporan-beban-uid":
      case "laporan-beban-up2b":
        columnChart = "mw"
        break;
      case "opsis-tegangan-gi":
        columnChart = "v"
        break;
    }
    setSeriesChart(result?.res[columnChart]);
    setCategoryChart(result?.cat);

    let resultLoadFactor: any = mappingLineChartLoadFactor(data, moment, format);
    setSeriesChartLoadFactor(resultLoadFactor?.res);
    setCategoryChartLoadFactor(resultLoadFactor?.cat);
  }

  useEffect(() => {
    getAllData()
    return () => {
      source.cancel()
    }
  }, [activeFilters, path, tabActiveUnit])

  useEffect(() => {
    let options: any = []
    if (page === "laporan-beban-penyulang") {
      options = tabOptionsUnit
    } else {
      options = tabOptionsUnit.filter(a => a.value !== "v")
    }
    setOptionsUnit(options)
  }, [tabActive, page])

  useEffect(() => {
    let options: any = []
    if (page === "laporan-beban-gh") {
      options = tabOptionsUnit
    } else {
      options = tabOptionsUnit.filter(a => a.value !== "v")
    }
    setOptionsUnit(options)
  }, [tabActive, page])

  useEffect(() => {
    let options: any = []
    if (page === "laporan-beban-kp") {
      options = tabOptionsUnit
    } else {
      options = tabOptionsUnit.filter(a => a.value !== "v")
    }
    setOptionsUnit(options)
  }, [tabActive, page])


  // useEffect(() => {
  //   if (resultChart) {
  //     setSeriesChart(resultChart?.res[page == "opsis-tegangan-gi" ? "v" : tabActiveUnit]);
  //     setCategoryChart(resultChart?.cat);
  //   }
  // }, [tabActiveUnit])


  return (
    <div className='px-4'>
      {page != "opsis-tegangan-gi" && page != "laporan-beban-subsistem" && page != "laporan-beban-up3" && page != "laporan-beban-up2b" && page != "laporan-beban-uid" &&
        <Tabs variant="pills" defaultActiveKey="mw" activeKey={tabActiveUnit} onSelect={(k: any) => setTabActiveUnit(k)} className="mb-2 tab-sm mt-3 ">
          {
            optionsUnit?.map((tab: any) => (
              <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
            ))
          }
        </Tabs>
      }

      <div className='mb-4  position-relative' style={{ height: '30vh' }}>
        <SplineChart
          series={seriesChart}
          categories={categoryChart}
          loading={loading}
        />
      </div>

      {tabActive !== "beban_perjam" && page != "opsis-tegangan-gi" &&
        <>
          <hr className='mt-3' />
          <Card.Title><h5>Load Faktor</h5></Card.Title>
          <div className='mb-4 position-relative' style={{ height: '30vh' }}>
            <AreaSplineChart
              series={seriesChartLoadFactor}
              categories={categoryChartLoadFactor}
              loading={loading}
              type="spline"
            />
          </div>
        </>
      }
    </div >
  );
}

interface IChartlaporanBeban {
  path?: any
  page?: any
  format: any
  tabActive: string
}