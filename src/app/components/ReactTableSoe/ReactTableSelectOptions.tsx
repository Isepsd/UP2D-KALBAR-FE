import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { getAllByPath } from '@app/services/main.service';

const pathByType: { [type: string]: any } = {
  pembangkit: 'master/jaringan/ref-lokasi'
};

type Props = {
  type: string;
};

const ReactTableSelectOptions: FC<Props> = ({ type }) => {
  const source = axios.CancelToken.source();

  const [options, setOptions] = useState<any>([])

  useEffect(() => {
    getAllData()
  }, [])

  useEffect(() => {
    return () => {
      source.cancel()
    }
  }, []);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: -1,
        id_ref_jenis_lokasi: 2,
        status_listrik: 1
      };

      const req: any = await getAllByPath(pathByType[type], params, source.token);
      const { results } = req;
      const dataLength = results ? results.length : 0;
      let data = results.map((d: any) => {
        switch (type) {
          case 'pembangkit':
            return { ...d, label: d.nama_lokasi, value: d.nama_lokasi }
            break;
          default:
            break;
        }
      });
      setOptions(dataLength > 0 ? data : [])
    } catch (err: any) {
      setOptions([])
    }
  };
  

  return (
    <>
      {options.map((option: any, i: number) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  )
}

export default ReactTableSelectOptions;