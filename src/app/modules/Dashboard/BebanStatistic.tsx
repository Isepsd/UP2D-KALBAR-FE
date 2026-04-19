import { nanoid } from '@reduxjs/toolkit';
import React, { useMemo, useState } from 'react';
import ProgressBarStats from '../ProgressBarStats/ProgressBarStats';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useApiRequest from '@app/services/useApiRequest';
import { progressNumberParser } from '@app/helper/parser/progress.parser';

interface IBebanStatistic {
  url: any;
  min: number;
  max: number
}

export default function BebanStatistic({url, min, max}: IBebanStatistic) {
  const [reqParams] = useState<any>({});
  
  const apiRequest = useApiRequest({
    url: url,
    method: 'GET',
    params: reqParams,
  });

  /** RENDER BOX BULANAN */
  const renderPembebanan = useMemo(() => {
    return (
      <PerfectScrollbar style={{ height: '100%' }}>
        {progressNumberParser(apiRequest?.response?.results)?.map((item: any) => (
          <div key={nanoid()}>
            <ProgressBarStats
              title={item?.lokasi}
              value={item?.nilai + `%`}
              realValue={item?.nilai}
              width={`${item?.nilai > 100 ? 100 : item?.nilai}%`}
              min={min}
              max={max}
              maxColor='danger'
              minColor='success'
            ></ProgressBarStats>
          </div>
        ))}
      </PerfectScrollbar>
    )
  }, [apiRequest.response]);

  return <>{renderPembebanan}</>;
}

