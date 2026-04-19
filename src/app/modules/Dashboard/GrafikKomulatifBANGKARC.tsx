import CardWidget from '@app/components/Card/CardWidget';
import { toTitleCase } from '@app/helper/string.helper';
import { chartMonthCategories, timeFormSelect } from '@app/helper/time.helper';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import SplineChartDashboard from '../Highcharts/SplineChartDashboard';
import PieChartBangka from '../Highcharts/PieChartBangka';
import BarChart from '../Highcharts/BarChartBangka';

function GrafikKomulatif({ path, title, suffix, titleY = '' }: IGrafikKomulatif) {
  const [chartType, setChartType] = useState('line'); // Default chart type is 'line'
  const [series, setSeries] = useState<any>();
  const [seriespie, setSeriespie] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();



  const getCategories = (results: any) => {
    if (results?.setting) {

      let interval = results?.setting == 30 ? 48 : 24;
      let time = results?.setting;
      let times = timeFormSelect(interval, time)
      let categories: any = []

      times?.map((item: any) => {
        categories.push(item?.label)
      })
      setCategories(categories)
    } else {
      let category = chartMonthCategories('MM', 'MMM');
      setCategories(category?.categoriesLabel);
    }
  }

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      const req: any = await getAllByPath(
        get(API_PATH(), path),
        {},
        source.token
      );
      const { results } = req;
      let series = results?.series?.map((item: any) => {
        let name = toTitleCase(item?.name || "")
        return {
          name: name.concat(suffix ? suffix : ""),
          data: item?.data || [],
        };
      })
      const seriesName = results?.name || 'Default Series Name';
      let seriespie = [
        {

          name: seriesName,
          data: results?.series?.map((item: any) => ({
            name: toTitleCase(item?.name || ""),
            y: item?.data?.reduce((total: any, dataItem: any) => total + dataItem, 0) || 0,
          })),
        },
      ];
      getCategories(results);
      setSeries(series);
      setSeriespie(seriespie);

      setLoading(false);
    } catch (err: any) {
      // console.log("error",);

      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
    // console.log('rerender')
    return () => {
      source.cancel();
      setSeries(null);
      setSeriespie(null);
      setCategories(null);
    };
  }, []);

  return (
    <>
      <CardWidget >

        <div>
          {/* Add radio buttons to select chart type */}
          <div>
            <label style={{ marginRight: '10px' }}>Select Chart Type:</label>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                value="line"
                checked={chartType === "line"}
                onChange={() => setChartType("line")}
              />
              Line Chart
            </label>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                value="pie"
                checked={chartType === "pie"}
                onChange={() => setChartType("pie")}
              />
              Pie Chart
            </label>
            <label>
              <input
                type="radio"
                value="bar"
                checked={chartType === "bar"}
                onChange={() => setChartType("bar")}
              />
              Bar Chart
            </label>

          </div>

          {/* Render the selected chart based on chartType */}
          <div>

            {chartType === 'line' && (
              <SplineChartDashboard
                title={title}
                categories={categories}
                series={series}
                loading={loading}
                titleY={titleY}
                legend={{}}
              />
            )}
            {chartType === 'pie' && (
              <PieChartBangka
                title={title}
                categories={categories}
                series={seriespie}
                loading={loading}
                titleY={titleY}
                legend={seriespie}
              />
            )}
            {chartType === 'bar' && (
              <BarChart
                title={title}
                categories={categories}
                series={series}
                loading={loading}
                titleY={titleY}
              />
            )}
          </div>
        </div>

      </CardWidget>
    </>
  );
}

export default GrafikKomulatif

interface IGrafikKomulatif {
  path: string;
  title: string;
  height?: string;
  suffix?: string;
  titleY?: string;

  data_categories?: any[any]

}
