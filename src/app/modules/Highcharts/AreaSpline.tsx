import NoData from '@app/components/Error/NoData';
import React from 'react'
import ContainerHighcharts from './ContainerHighcharts'

interface IAreaSpline {
  series?: any,
  categories?: any,
  loading?: any,
  type?: string
}


function AreaSplineChart({
  series,
  categories = [],
  loading,
  type = "areaspline"
}: IAreaSpline) {



  const chartOptions: any = {
    title: { text: '' },
    credits: { enabled: false },
    chart: { backgroundColor: 'transparent', type: type },
    yAxis: {
      title: {
        text: '',
      },
    },

    xAxis: {
      categories: categories
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

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

  return (
    <>
      {loading ? 'Loading...' : (
        <>
          {categories?.length > 0 && (
            <ContainerHighcharts chartOptions={chartOptions} />
          )}
          {categories?.length === 0 && (
            <>
              <div className="position-relative"><NoData /></div>
            </>
          )}
        </>
      )}
    </>

  )
}

export default AreaSplineChart