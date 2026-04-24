import CardWidget from '@app/components/Card/CardWidget';
import { toTitleCase } from '@app/helper/string.helper';
// import { chartMonthCategories, timeFormSelect } from '@app/helper/time.helper';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import SplineChartDashboard from '../Highcharts/SplineChartDashboard';
import CardInfo from "@app/components/Card/CardInfo";
import { nanoid } from '@reduxjs/toolkit';
import BarChartBangka from '../Highcharts/BarChartBangka';
function GrafikKomulatif({
  path,
  title,
  height = "20rem",
  suffix,
  titleY = "",
  filterParams
}: IGrafikKomulatif) {
  const [series, setSeries] = useState<any[]>([]); // Inisialisasi dengan array kosong
  const [categories, setCategories] = useState<any[]>([]); // Inisialisasi dengan array kosong
    const [seriesKin, setSeriesKin] = useState<any[]>([]);
    const [categorieskin, setCategorieskin] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const source = axios.CancelToken.source();
  const [data, setData] = useState<any[]>([]);
  // const getCategoriesAndSeriesKin = (kinerjapoint: any) => {
  //     if (kinerjapoint && Array.isArray(kinerjapoint)) {
  //       const categoriesData = get(kinerjapoint[0], 'categories', []);
  //       const seriesData = get(kinerjapoint[1], 'series', []);
  
  //       setCategorieskin(categoriesData);
        
  //       const formattedSeries = seriesData.map((item: any) => {
  //         const name = toTitleCase(item?.name || "");
  //         return {
  //           name: name.concat(suffix ? suffix : ""),
  //           data: item?.data || [],
  //           yAxis:item?.yAxis
  //         };
  //       });
        
  //       setSeriesKin(formattedSeries);
  //     } else {
       
  //       setCategorieskin([]);
  //       setSeriesKin([]);
  //     }
  //   };
  
  // const getCategoriesAndSeries = (datachart: any) => {
  //   if (datachart && Array.isArray(datachart)) {
  //     // Assuming datachart[0] contains categories and datachart[1] contains series
  //     const categoriesData = get(datachart[0], 'categories', []);
  //     const seriesData = get(datachart[1], 'series', []);

  //     setCategories(categoriesData);
      
  //     // Format series data if needed
  //     const formattedSeries = seriesData.map((item: any) => {
  //       const name = toTitleCase(item?.name || "");
  //       return {
  //         name: name.concat(suffix ? suffix : ""),
  //         data: item?.data || [],
  //       };
  //     });
      
  //     setSeries(formattedSeries);
  //   } else {
  //     // Handle case where datachart is not in expected format
     
  //     setCategories([]);
  //     setSeries([]);
  //   }
  // };

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);
  
    try {
      const req: any = await getAllByPath(
        get(API_PATH(), path),
        filterParams,
        source.token
      );
      const { results } = req;
  
      // Jika datachart ada
      if (results?.datachart) {
        const categoriesData = get(results.datachart[0], 'categories', []);
        const seriesData = get(results.datachart[1], 'series', []);
  
        setCategories(categoriesData);
        const formattedSeries = seriesData.map((item: any) => ({
          name: toTitleCase(item?.name || "").concat(suffix || ""),
          data: item?.data || [],
        }));
        setSeries(formattedSeries);
      } else {
        setCategories([]);
        setSeries([]);
      }
  
      // Jika kinerjapoint ada
      if (results?.kinerjapoint) {
        const categoriesData = get(results.kinerjapoint[0], 'categories', []);
        const seriesData = get(results.kinerjapoint[1], 'series', []);
  
        setCategorieskin(categoriesData);
        const formattedSeries = seriesData.map((item: any) => ({
          name: toTitleCase(item?.name || "").concat(suffix || ""),
          data: item?.data || [],
          yAxis: item?.yAxis,
        }));
        setSeriesKin(formattedSeries);
      } else {
        setCategorieskin([]);
        setSeriesKin([]);
      }
  
      // Jika rekap ada
      if (results?.rekap) {
        const rekap = get(results, 'rekap', []);
        const newData = rekap.map((item: any) => ({
          value: get(item, 'value', 0),
          label: get(item, 'name', ''),
          subname: get(item, 'label', ''),
        }));
        setData(newData);
      }
  
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getAllData();
    return () => {
      // source.cancel();
      setSeries([]);
      setCategories([]);
      setSeriesKin([]);
      setCategorieskin([]);
      
    };
  }, []); // Adding filterParams as dependency

  return (
    <>
  <Row>
  {/* Kolom Kiri: Konten Utama */}
  <CardWidget title="Kinerja SCADA UIW KALBAR">
      <Row className="gx-6">
        {data.map((item, index) => {
          const variants = ["primary", "success", "warning"];
          const variant = variants[index % variants.length];

          return (
            <Col md={4} key={item?.id || nanoid()} className="mb-2">
              <CardWidget title={item?.subname}>
                <CardInfo
                  variant={variant}
                  value={item.value}
                  suffix={suffix || ''}
                  label={item.label}
                  height={height}
                />
              </CardWidget>
            </Col>
          );
        })}
      </Row>
    </CardWidget>
  <Col md={12} lg={8} xl={8}>
    

    <CardWidget title={title}>
      <div style={{ height: height }}>
        <SplineChartDashboard
          categories={categories}
          series={series}
          loading={loading}
          titleY={titleY}
        />
      </div>
    </CardWidget>
  </Col>

  {/* Kolom Kanan: JUMLAH JENIS POINT */}
  <Col md={12} lg={4} xl={4} style={{ height: '100%' }}>
    <Card style={{ height: '100%' }}>
      <Card.Body style={{ height: '100%' }}>
        <h5
          className="card-title"
          style={{
            borderBottom: '2px solid #000',
            paddingBottom: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          JUMLAH JENIS POINT
        </h5>
        <div style={{ height: '53rem' }}>
          <div className="mb-2" key={nanoid()}>
            <BarChartBangka
              categories={categorieskin}
              series={seriesKin}
              loading={loading}
              titleY={titleY}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>

    </>
      
  );
}

export default GrafikKomulatif;

interface IGrafikKomulatif {
  path: string;
  title: string;
  titleY?: string;
  height?: string;
  suffix?: string;
  filterParams?: any;
}
