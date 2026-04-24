import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from "react-redux";

import { HighchartTheme } from '@app/configs/highcharts-theme.config'

interface IWHSpline {
  title?: string;
  subtitle?: string;
  data: any
  categories: any
  legend: boolean
  name?: string
}

function WiHighchartsSpline(
  {
    name = "",
    title = "",
    subtitle = "",
    data = [],
    categories,
    // legend = false
  }: IWHSpline
) {
  const { themeMode } = useSelector((state: any) => state.ui);
  const chartRef: any = useRef<HTMLDivElement>(null);
  
  // console.log("data", legend);


  useEffect(() => {
    if (chartRef?.current) {
      const { chart } = chartRef.current
      chart.update(HighchartTheme(themeMode || 'light'))
    }
  }, [themeMode, chartRef]);

  const chartOptions: any = {
    credits: { enabled: false },
    chart: {
      type: 'areaspline',
      scrollablePlotArea: {
        // minWidth: 600,
        // scrollPositionX: 1
      }
    },
    title: {
      text: title,
      align: 'left'
    },
    subtitle: {
      text: subtitle,
      align: 'left'
    },
    xAxis: {
      categories: categories,
      // type: categories,
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      labels: {
        format: '{text} Hz' 
      }
    },
    tooltip: {
      valueSuffix: ' Hz'
    },
    plotOptions: {
      spline: {
        // lineWidth: 4,
        // states: {
        //   hover: {
        //     lineWidth: 5
        //   }
        // },
        // marker: {
        //   enabled: false
        // },
        // pointInterval: 300000, // one hour
        // pointStart: Date.UTC(2018, 1, 13, 0, 0, 0)
      }
    },
    series: [{
      name: name,
      data: data

    }],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  };

  return (
    <HighchartsReact
      containerProps={{ style: { height: '100%' } }}
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartRef}
    />
  );
}

export default WiHighchartsSpline;
