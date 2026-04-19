import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Check from "@app/components/Checkbox/Check";
import SubHeader from "../AppsLayout/Header/SubHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  exportingData,
  reloadingData,
  generatingData,
} from "@app/store/reducers/app";
import moment from "moment";
import ButtonCustom from "@app/components/Button/ButtonCustom";
import { nanoid } from "@reduxjs/toolkit";
type Props = {
  children?: any;
  childrenPosition?: any;
  add?: any;
  Mapping?: any;
  upload?: any;
  onClickupload?: any;
  onClickAdd?: any;
  onClickMapping?: any;
  filter?: boolean | false;
  columns?: any;
  column?: any;
  setColumns?: any;
  exporting?: boolean;
  exportingOptions?: any;
  module?: any;
  spaceTop?: any;
  generate?: boolean;
  reload?: boolean;

  exportOptions?: any;
  infoLabels?: any[any];
  filterLayout?: "dropdown" | "card";
  isUpload?: boolean;
  onShowModal?: any;
  title?: any;
};

const exportOptionsDefault = [
  // { label: 'CSV', type: 'csv' },
  { label: "MS-Excel", type: "xlsx" },
];

function TableDataListAction({
  children,
  exportOptions = exportOptionsDefault,
  childrenPosition = "filter",
  add = true,
  Mapping = false,
  onClickupload,
  upload = false,
  onClickAdd,
  onClickMapping,
  filter = true,
  columns = [],
  setColumns,
  generate = false,
  exporting = true,
  column = true,
  spaceTop = 2,
  reload = true,
  exportingOptions = "all",
  module = null,
  filterLayout = "dropdown",
  infoLabels,
  isUpload = false,
  onShowModal,
  title='DEFAULT',
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { generateData, exportData } = useSelector((state: any) => state.app);
  const JustifyContent = styled.div`
    justify-content: space-between !important;
    display: flex !important;
    margin-top: ${spaceTop}rem;
  `;

  const [columnOptions, setColumnOptions] = useState<any>([]);
  const [loaderDownload, setLoaderDownload] = useState<any>(false);

  useEffect(() => {
    if (columns.length > 0) {
      setColumnOptions(columns);
    }
  }, [columns]);

  useEffect(() => {
    return () => {
      setColumnOptions(null);
    };
  }, []);

  const onChangeColumn = (show: boolean, accessor: string) => {
    const cols = columns.map((x: any) => {
      if (x.accessor == accessor) x.show = !show;
      return x;
    });
    setColumns(cols);
  };

  const handleAddClick = (e: any) => {
    if (onClickAdd) {
      onClickAdd(e);
    } else {
      const target = typeof add == "boolean" ? "add" : add;
      navigate(target);
    }
  };
  const handleMappingClick = (e: any) => {
    if (onClickMapping) {
      onClickMapping(e);
    } else {
      const target = typeof add == "boolean" ? "mapping" : add;
      navigate(target);
    }
  };
  const handleuploadClick = (e: any) => {
    if (onClickupload) {
      onClickupload(e);
    } else {
      const target = typeof add == "boolean" ? "upload" : add;
      navigate(target);
    }
  };

  const handleReloadData = () => {
    const reload = module ? module : "default-" + moment().valueOf();
    dispatch(reloadingData(reload));
  };

  const handleExportData = (type: string) => {
    setLoaderDownload(true);
    dispatch(exportingData({ table: module, type: type }));
  };

  const handleGenerateClick = () => {
    dispatch(generatingData({ table: module }));
  };

  useEffect(() => {
    if (!exportData) {
      setLoaderDownload(false);
    }
  }, [exportData]);

  return (
    <>
      {filter && (
        <SubHeader filterLayout={filterLayout}>
          {filter && children && children}
        </SubHeader>
      )}
  {infoLabels && (
    <div>
      {infoLabels.map((item: any) => (
        <Button
          variant={item?.color}
          key={nanoid()}
          className="ms-1 btn-sm mb-1"
          style={{ color: "var(--black)" }}
        >
          {item?.name}
        </Button>
      ))}
    </div>
  )}
      {
        // (columns?.length > 0 || generate) && (
          <div
          style={{
            background: 'linear-gradient(135deg, #2aa198, #4682b4)',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          
          {/* Left side for the title */}
          <div
              style={{
                fontWeight: '600', // Sedikit lebih ringan dari bold
                fontSize: '15px',  // Ukuran lebih besar untuk judul tabel
                color: '#ffffff',
                flex: 1,
                fontFamily: 'Poppins, sans-serif',
                textAlign: 'left', // Judul tabel rata kiri
                textTransform: 'uppercase', // Huruf kapital untuk kesan formal
                letterSpacing: '1px', // Memberi sedikit jarak antar huruf
              }}
            >
              {`${title}`}
            </div>

          
          
          <div style={{ textAlign: 'right' }}>
          <JustifyContent></JustifyContent>
           
            {upload && (
              <Button variant="primary" onClick={handleuploadClick}>
                Upload Data
              </Button>
            )}
            {generate && (
              <ButtonCustom
                isLoading={generateData}
                disabled={generateData}
                variant={"primary"}
                onClick={handleGenerateClick}
                className="mb-1 me-1 "
              >
                Generate Data
              </ButtonCustom>
            )}

            {/* <ButtonCustom
                isLoading={generateData}
                disabled={generateData}
                variant={'primary'}
                onClick={handleGenerateClick}
                className="mb-1 me-1 "
              >
                Generate Data
              </ButtonCustom> */}

      
            {childrenPosition == "left" && children}
          </div>

          <div>
            {/* {isUpload && <Button variant='primary' onClick={onShowModal}>Upload Beban KTT</Button>} */}

            <ButtonGroup className="ms-2" aria-label="Basic example">
              {reload && (
                <Button
                  variant=""
                  onClick={handleReloadData}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <i className="fas fa-sync-alt"></i>
                </Button>
              )}
              {isUpload && (
                <Button
                  variant=""
                  onClick={onShowModal}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <i className="fa-solid fa-upload"></i>
                </Button>
              )}
              {column && (
                <Dropdown className="hide-toogle">
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-download"
                    className="dropdown-group border-radius-left-0"
                    style={
                      exporting
                        ? { borderRadius: 0 }
                        : {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          }
                    }
                  >
                    <i className="fa-solid fa-list-check"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="px-3">
                    {columnOptions
                      ?.filter((cf: any) => cf.Header && !cf?.hideColumn)
                      ?.map(({ show, Header, accessor }: any, index: any) => {
                        return (
                          <Check
                            key={index}
                            checked={show}
                            label={Header}
                            defaultValue={show}
                            onChange={() => onChangeColumn(show, accessor)}
                          />
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {exporting && (
                <Dropdown className="hide-toogle">
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-download"
                    className="dropdown-group border-radius-left-0"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    disabled={false}
                  >
                    <i className="fa fa-download"></i>
                    {loaderDownload && (
                      <i className="dropdown-group border-radius-left-0"></i>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {exportOptions
                      .filter(
                        (f: any) =>
                          exportingOptions == "all" ||
                          exportingOptions?.includes(f.type)
                      )
                      .map((d: any) => (
                        <Dropdown.Item
                          key={nanoid()}
                          onClick={() => handleExportData(d.type)}
                        >
                          {d.label}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ButtonGroup>
         
          </div>
       
          </div>
          
      }

      <br></br>
         {add && (
              <Button variant="primary" onClick={handleAddClick}>
                Tambah Data
              </Button>
            )}
         {Mapping && (
              <Button variant="primary" onClick={handleMappingClick}>
                Mapping Data
              </Button>
            )}
    </>
  );
}

export default React.memo(TableDataListAction);
