import CardInfo from "@app/components/Card/CardInfo";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";

function StatisticKinerjaScada({
  path,
  variant,
  suffix,
  label,
  height='6.2rem',
  fieldName,
  filterParams,

}: IStatisticKinerjaScada) {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<any>()
  const source = axios.CancelToken.source();
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
       
      const req: any = await getAllByPath(get(API_PATH(), path), filterParams, source.token);
      const { results } = req;
      setData(get(results, fieldName) || 0)
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData()
    return (() => {
      source.cancel()
      setData(null)
    })
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <CardInfo
        variant={variant}
        value={data}
        suffix={suffix || ''}
        label={label}
        height={height}
      />
    </>
  )
}

export default React.memo(StatisticKinerjaScada)

interface IStatisticKinerjaScada {
  path: string
  variant: string
  suffix?: string
  height?: string
  label: string
  fieldName: string
  filterParams:any
}