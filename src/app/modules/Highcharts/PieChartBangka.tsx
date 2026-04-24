import React, { useState,  } from 'react';
import ContainerHighcharts from './ContainerHighcharts';
import NoData from '@app/components/Error/NoData';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import Highcharts from 'highcharts';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);

function PieChart({
  loading,
  categories,
  series,
  legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  titleY = '',
  title = '',
}: IPieChart) {
    // const resultArray = [];
    // const suffix = "_Suffix";
    // const items = [
    //     { name: "John", data: [1, 2, 3] },
    //     { name: "Alice", data: [4, 5, 6] },
    //     { name: "Bob", data: [7, 8, 9] },
    //   ];
    // items.forEach((item) => {
    //     const name = item.name.concat(suffix ? suffix : "");
    //     const data = item.data;
        
    //     // Push the object into the result array
    //     resultArray.push({ name, data });
    //   });
    const [seriesDataLength] = useState<number>()
//   const categoriespie = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
//     'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//   ];
  
//   // Create a mapping from month names to data points
//   const seriespie = categoriespie.map((name, index) => ({
//     name: name,
//     y: index + 1, // y values from 1 to 12
//   }));


//   const combinedArray = seriespie.concat(series);

  const chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
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
    yAxis: {
      title: {
        text: titleY,
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '',
      },
    },
    legend: legend,
    plotOptions: {
      pie: {
        showInLegend: true,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true, // Set this to true to display category labels
          format: '<b>{point.name}</b>: {point.percentage:.2f} %',
        },
      },
    },
    xAxis: {
      categories: categories,
    //   showInLegend: true,
    },
    series:series,
   
    colors: ['#FF5733', '#FFC300', '#36A2EB', '#4CAF50', '#FF5733'],
  };

//   useEffect(() => {
//     let totalDataLength = 0;
//     // Check if series is defined before iterating
//     if (chartOptions.series) {
//       chartOptions.series[0].data.forEach((item: any) => {
//         // Check if item.data is defined before accessing its length property
//         if (item && item.data) {
//           totalDataLength += item.data.length;
//         }
//       });
//     }
//     setSeriesDataLength(totalDataLength);
//   }, [chartOptions.series]);

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {categories?.length > 0 && (
            <ContainerHighcharts chartOptions={chartOptions} />
          )}
          {(!loading && (categories?.length === 0 || seriesDataLength === 0)) && (
            <div className='w-100' style={{ position: 'absolute', top: '8rem' }}>
              <NoData></NoData>
            </div>
          )}
        </>
      )}
    </>
  );
}

interface IPieChart {
  loading?: any;
  title?: string;
  titleY?: string;
  legend?: any;
  categories?: any;
  series?: any;
}

export default PieChart;
