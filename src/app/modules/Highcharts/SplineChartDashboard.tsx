import React, { useEffect, useState,  } from 'react';
import ContainerHighcharts from './ContainerHighcharts';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import NoData from '@app/components/Error/NoData';


// import HighchartsReact from 'highcharts-react-official'; // Add this import

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);


interface IAreaSpline {
  series?: any;
  categories?: any;
  legend?: any;
  title?: string;
  loading?: any;
  exporting?: any;
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
  title = '',
  
  titleY = '',
}: IAreaSpline) {

  const [seriesDataLength, setSeriesDataLength] = useState<number>();

  useEffect(() => {
    let totalDataLength = 0;
    // Check if series is defined before iterating
    if (series) {
      series.forEach((item: any) => {
        // Check if item.data is defined before accessing its length property
        if (item && item.data) {
          totalDataLength = totalDataLength + item.data.length;
        }
      });
    }
    setSeriesDataLength(totalDataLength);
  }, [series]);

  // Check if categories and series are defined before rendering
  if (!categories || !series) {
    return null;
  }

  // Generate unique colors for series
  const uniqueSeriesColors = ['#FF5733', '#339AFF', '#33FF5F', '#FF33F9', '#33FFF8', '#FFFA33'];

  // Assign unique colors to the series
  const coloredSeries = series.map((item: any, index: number) => ({
    ...item,
    color: uniqueSeriesColors[index],
  }));


  
  const chartOptions: Highcharts.Options = {
    exporting: {
      enabled: true,
      buttons: {
       
                contextButton: {
                  
                    
                    y: -10,
                    menuItems: ['printChart', 'downloadJPEG', 'downloadPDF', 'downloadCSV'],
                    align: 'right',
                 verticalAlign: 'top',
                },
            
      },
    },
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
    series: coloredSeries, // Use the colored series
   
  };

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {categories.length > 0 && (
            <>
              <ContainerHighcharts
                chartOptions={chartOptions}
            
              />
            </>
          )}
          {(!loading && (categories.length === 0 || seriesDataLength === 0)) && (
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
