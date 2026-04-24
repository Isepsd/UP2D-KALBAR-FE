import CardWidget from '@app/components/Card/CardWidget';
import { toTitleCase } from '@app/helper/string.helper';
import { chartMonthCategories, timeFormSelect } from '@app/helper/time.helper';
// import { getAllByPath } from '@app/services/main.service';
// import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
// import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import BarChart from '../Highcharts/BarChart';

function GrafikKomulatif({ title, height = "20rem", suffix, titleY = "" }: IGrafikKomulatif) {
  const [series, setSeries] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();
  const handleCardClick = () => {
    // Handle the click event here
    // You can perform any action you want when the card is clicked
    console.log(`Card '${title}' clicked!`);
  };

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
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate a 300ms delay for loading
    setLoading(true);
  
    try {
      // Simulate data fetching by creating a dummy response
      const dummyResponse = {
        results: {
          datas: [
            {
              name: "Category 1",
              data: [10, 15, 20, 25, 30],
            },
            {
              name: "Category 2",
              data: [5, 10, 15, 20, 25],
            },
          ],
          setting: 30, // Simulate a setting value
        },
      };
  
      const { results } = dummyResponse;
  
      // Simulate mapping the dummy response to the series
      let series = results?.datas?.map((item: any) => {
        let name = toTitleCase(item?.name || "");
        return {
          name: name.concat(suffix ? suffix : ""),
          data: item?.data || [],
        };
      });
  
      getCategories(results);
      setSeries(series);
  
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };
  

    useEffect(() => {
      getAllData();
      // console.log('rerender')
      return () => {
        source.cancel();
        setSeries(null);
        setCategories(null);
      };
    }, []);

  return (
    <>
      <div onClick={handleCardClick}></div>
      <CardWidget title={title}>
        <div style={{ height: height }}>
          <BarChart
            categories={categories}
            series={series}
            loading={loading}
            titleY={titleY}
            // legend={
            //   {
            //     // layout: 'horizontal',
            //     // align: 'bottom',
            //     // verticalAlign: 'bottom',
            //   }
            // }
          />
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
  onClick?:any
}
