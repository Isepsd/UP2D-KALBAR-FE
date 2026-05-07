import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ChartKPWilayah() {
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      categories: ['Pontianak', 'Singkawang', 'Sintang', 'Ketapang', 'Sanggau', 'Sambas'],
      crosshair: true,
      lineWidth: 1,
      lineColor: '#ccd6eb'
    },
    yAxis: {
      min: 0,
      max: 100,
      title: { text: undefined },
      labels: {
        format: '{value}%'
      },
      gridLineDashStyle: 'Dash',
      gridLineColor: '#e6e6e6'
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
        borderRadius: 2
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemStyle: {
        color: '#666',
        fontWeight: 'normal',
        fontSize: '12px'
      }
    },
    series: [
      {
        name: 'Target (%)',
        type: 'column',
        data: [95, 88, 82, 83, 78, 79],
        color: '#6c757d' // Abu-abu
      },
      {
        name: 'Realisasi (%)',
        type: 'column',
        data: [91, 85, 77, 80, 74, 70],
        color: '#005696' // Biru PLN
      }
    ]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}