import NoData from '@app/components/Error/NoData';
import React, { useEffect, useState } from 'react';
import ContainerHighcharts from './ContainerHighcharts';

interface IAreaSpline {
  series?: any;
  categories?: any;
  legend?: any;
  title?: string;
  loading?: any;
  height?: string;
  titleY?: string;
  pathServiceName?: any;
}

function SplineChart({
  categories,
  series,
  loading,
  legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  title = "",
  titleY = ""
}: IAreaSpline) {
  const [seriesDataLength, setSeriesDataLength] = useState<number>()
  const chartOptions: any = {
    title: { text: title },
    credits: { enabled: false },
    chart: { backgroundColor: 'transparent', type: 'spline' },
    yAxis: {
      title: {
        text: titleY,
      },
    },

    xAxis: {
      categories: categories,
    },

    legend: legend,

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        // pointStart: 2010,
      },
    },

    series: series,
  };

  useEffect(() => {
    let totalDataLength = 0
    series?.forEach((item: any) => {
      totalDataLength = totalDataLength + item?.data?.length
    })
    setSeriesDataLength(totalDataLength)
  }, [series])
  // console.log((!loading && (categories?.length == 0 || seriesDataLength===0)))
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {categories?.length > 0 && (
            <ContainerHighcharts chartOptions={chartOptions} />
          )}
          {(!loading && (categories?.length == 0 || seriesDataLength === 0)) && (
            <div className='w-100' style={{ position: 'absolute', top: '8rem' }}>
              <NoData></NoData>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SplineChart;
