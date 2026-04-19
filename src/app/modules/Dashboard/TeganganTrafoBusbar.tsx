import CardWidget from "@app/components/Card/CardWidget";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { progressNumberParser } from "@app/helper/parser/progress.parser";
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
// import ProgressBarStats from "../ProgressBarStats/ProgressBarStats";
import styled from 'styled-components';

function TeganganTrafoBusbar() {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<any>()
  const source = axios.CancelToken.source();
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {

      const req: any = await getAllByPath(get(API_PATH(), "dashboard.kinerja_opsis.tegangan_busbar"), {}, source.token);
      const { results } = req;
      // console.log("results", results);
      let datas = progressNumberParser(results, undefined, 'lokasi', 'nilai', 25)
      setData(datas)
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData()
    const timer = setInterval(() => {
      getAllData()
    }, 60000); // 60000 milliseconds = 1 minutes

    return (() => {
      source.cancel()
      setData(null)
      clearInterval(timer)
    })
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <CardWidget className='mb-2'
        title='Tegangan Trafo Gardu Induk'
        height={'32.2rem'}
        isScroll={true}>
        {data?.map((item: any, index: number) => (
          <div key={index}>
            {/* <ProgressBarStats
                title={item?.lokasi}
                value={`${item?.value} kV`}
                width={`${item?.width} kV`}
                min={20.8}
                max={21.5}
                realValue={item?.value_2}
              ></ProgressBarStats> */}
            <div className='mb-3'>
              <div className="d-flex justify-content-between">
                <Title className='elipsis' title={item?.lokasi}>{item?.lokasi}</Title>
                <Value><span className={item?.color}>{item?.nilai} kV</span></Value>
              </div>
              <div>
                <div className='progress-bar-container'>
                  <div
                    className={`progress-bar-indicator progress-bar-indicator-${item?.color}`}
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardWidget>
    </>
  )
}

const Title = styled.h6`
  width: 85%;
  margin-bottom: 0;
`;


const Value = styled.div`
  width: auto;
  text-align: right;
`;
export default React.memo(TeganganTrafoBusbar)