import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { HighchartTheme } from '@app/configs/highcharts-theme.config';

type Props = {
  chartOptions: any,
}

function ContainerHighcharts({ chartOptions }: Props) {
  const { themeMode } = useSelector((state: any) => state.ui);
  const chartRef = useRef<any>(null); // Menentukan tipe yang sesuai jika perlu

  const [options, setOptions] = useState<any>(chartOptions);

  useEffect(() => {
    if (chartRef.current) {
      const { chart } = chartRef.current;
      if (chart) {
        chart.update(HighchartTheme(themeMode || 'light'));
      }
    }
  }, [themeMode]);

useEffect(() => {
  setOptions((prevOptions: any) => ({
    ...prevOptions,
    ...chartOptions,
  }));
}, [chartOptions]);


  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: '100%' } }}
      ref={chartRef}
    />
  );
}

export default ContainerHighcharts;
