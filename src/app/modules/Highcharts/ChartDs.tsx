import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import CardWidget from '@app/components/Card/CardWidget';

// Import highcharts-more for additional features
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);

highchartsExporting(Highcharts);
highchartsExportData(Highcharts);
highchartsAccessibility(Highcharts);

interface IChart {
    titles: string;
    series: any;
    categories: any;
    typeChart?: string;
}

export default function ChartDs({ titles, series, categories, typeChart = 'line' }: IChart) {
    const chartRef = useRef<any>(null);
    const [options, setOptions] = useState<Highcharts.Options>({});

    const chartType = typeChart === 'column' ? 'column' : typeChart === 'pie' ? 'pie' : 'line'; // Set chart type based on typeChart prop

    const optionsChart: Highcharts.Options = {
        title: { text: titles },
        credits: { enabled: false },
        chart: {
            type: chartType, // Set the chart type dynamically
            // ... (other chart configuration options)
        },
        yAxis: {
            title: {
                text: typeChart === 'column' ? '%' : typeChart === 'pie' ? '%' : '%',
            },
        },
        xAxis: { tickInterval: 1, categories: categories },
        exporting: {
            buttons: {
                contextButton: {
                    symbol: 'menuball',
                    y: -2,
                    menuItems: ['printChart', 'downloadJPEG', 'downloadPDF', 'downloadCSV'],
                },
            },
        },
        // ... (other chart configuration options)

        series: series,
    };

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current.chart;
            const btn = chart?.container.querySelector('.highcharts-a11y-proxy-button.highcharts-no-tooltip') as HTMLElement;
            if (btn && !btn.title) {
                btn.title = Highcharts.getOptions().lang?.contextButtonTitle ?? 'Chart context menu';
            }
        }
        setOptions(optionsChart);
    }, [series, titles, chartType]); // Include chartType in dependency array

    return (
        <CardWidget>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                callback={(chart: any) => (chartRef.current = chart)}
            />
        </CardWidget>
    );
}