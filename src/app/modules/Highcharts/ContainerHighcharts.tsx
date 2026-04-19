import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from "react-redux";

import { HighchartTheme } from '@app/configs/highcharts-theme.config'

type Props = {
  chartOptions: any,
}

function ContainerHighcharts({chartOptions}:Props) {
  const { themeMode } = useSelector((state: any) => state.ui);
  const chartRef: any = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState<any>({})

  useEffect(() => {
    if(chartRef?.current){
      const { chart } = chartRef.current
      chart.update(HighchartTheme(themeMode || 'light'))
    }
  }, [themeMode, chartRef]);

  useEffect(() => {
    if(chartOptions) setOptions(chartOptions)
  }, [chartOptions])
  

  return (
    <HighchartsReact containerProps={{ style: { height: '100%' } }} highcharts={Highcharts} options={options} ref={chartRef} />
  );
}

export default ContainerHighcharts