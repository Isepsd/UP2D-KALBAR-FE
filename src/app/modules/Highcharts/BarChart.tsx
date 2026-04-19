import NoData from '@app/components/Error/NoData';
import React from 'react';
import ContainerHighcharts from './ContainerHighcharts';

function BarChart({
  series = [],
  categories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  text = null,
  loading,
  type = 'column',
  titleY = ""
}: IBarChart) {
  const chartOptions: any = {
    chart: {
      type: type,
    },
    title: {
      text: text,
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: titleY,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },

    series: series,
  };

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {categories?.length > 0 && (
            <ContainerHighcharts chartOptions={chartOptions} />
          )}
          {categories?.length === 0 && (
            <div className='position-relative'>
              <NoData />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default BarChart;

interface IBarChart {
  series?: any;
  categories?: any;
  loading?: any;
  text?: any;
  type?: string;
  titleY?: string;
}
