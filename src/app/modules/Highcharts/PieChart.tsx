import React from 'react'
import ContainerHighcharts from './ContainerHighcharts'

function PieChart({
    series,
}: IPieChart) {
    const chartOptions: any = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: ''
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: series
    }

    return (
        <ContainerHighcharts chartOptions={chartOptions} />
    )
}

interface IPieChart {
    series: any
}

export default PieChart