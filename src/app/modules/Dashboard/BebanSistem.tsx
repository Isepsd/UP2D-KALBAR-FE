import CardInfo from '@app/components/Card/CardInfo';
import CardWidget from '@app/components/Card/CardWidget';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

export default function BebanSistem({ path,
  title, suffix = "%", variant = "success",
  filterParams = {},
  fieldLable = "nama_lokasi",
  fieldValue = "p",
  md = 3,
}: IBebanSistem) {

  const [data, setData] = useState<any>();
  const [, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {

      const req: any = await getAllByPath(
        get(API_PATH(), path),
        filterParams,
        source.token
      );
      const { results } = req;

      let data = results?.map((item: any) => {
        return {
          label: get(item, fieldLable) || "",
          value: get(item, fieldValue) || 0.00,
        };
      })
      setData(data)
      setLoading(false);
    } catch (err: any) {
      // console.log("error",);

      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData()
    // const timer: any
    // if (autoReload) {
    const timer = setInterval(() => {
      getAllData()
    }, 5000);
    // }

    return () => {
      source.cancel()
      clearInterval(timer)
    }
  }, [path])

  return (
    <>
      <CardWidget title={title}>
        <Row className='gx-1'>
          {data?.map((item: any, index: number) => (
            <Col md={md} key={index} className='mb-2'>
              <CardInfo
                variant={variant}
                value={item?.value}
                suffix={suffix}
                label={item?.label}
              />
            </Col>
          ))}
        </Row>
      </CardWidget>
    </>
  );
}

interface IBebanSistem {
  path: string;
  title: string;
  suffix?: string;
  variant?: string;
  fieldLable?: string;
  fieldValue?: string;
  filterParams?: any;
  autoReload?: boolean;
  md?: number;
  data_categories?: any[any]
}
