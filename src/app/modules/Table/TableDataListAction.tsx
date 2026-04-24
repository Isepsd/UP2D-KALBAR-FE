import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Check from '@app/components/Checkbox/Check';
import SubHeader from '../AppsLayout/Header/SubHeader';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { exportingData, reloadingData, generatingData } from '@app/store/reducers/app';
import moment from 'moment';
import ButtonCustom from '@app/components/Button/ButtonCustom';
import { nanoid } from '@reduxjs/toolkit';
type Props = {
  children?: any;
  childrenPosition?: any;
  add?: any;
  copyPointState?: any;
  onCopyPointState?: any;
  onClickAdd?: any;
  filter?: boolean | false;
  columns?: any;
  column?: any;
  setColumns?: any;
  exporting?: boolean;
  exportingOptions?: any;
  module?: any;
  generate?: boolean;
  reload?: boolean;
  spaceTop?: any;
  exportOptions?: any;
  infoLabels?: any[any];
  filterLayout?: 'dropdown' | 'card';
  isUpload?: boolean;
  onShowModal?: any;
};

const exportOptionsDefault = [
  // { label: 'CSV', type: 'csv' },
  { label: 'MS-Excel', type: 'xlsx' },
];


function TableDataListAction({
  children,
  exportOptions = exportOptionsDefault,
  childrenPosition = 'filter',
  add = true,
  filter = true,
  columns = [],
  setColumns,
  onClickAdd,
  generate = false,
  copyPointState = false, // 
  onCopyPointState,
  exporting = true,
  column = true,
  reload = true,
  exportingOptions = 'all',
  module = null,
  spaceTop = 2,
  filterLayout = 'dropdown',
  infoLabels,
  isUpload = false,
  onShowModal,
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
      const target = typeof add == 'boolean' ? 'add' : add;
      navigate(target);
    }
  };


  const handleCopyPointState = (e:any) => {
    if (onCopyPointState) {
      onCopyPointState(e);
    } else {
      const target = typeof add == 'boolean' ? 'copyPointState' : copyPointState;
      navigate(target);
    }
  };



  const handleReloadData = () => {
    const reload = module ? module : 'default-' + moment().valueOf()
    dispatch(reloadingData(reload))
  }

  const handleExportData = (type: string) => {
    setLoaderDownload(true)
    dispatch(exportingData({ table: module, type: type }))
  }

  const handleGenerateClick = () => {
    dispatch(generatingData({ table: module }))
  }

  useEffect(() => {
    if (!exportData) {
      setLoaderDownload(false);
    }
  }, [exportData]);


  return (
    <>
      {
        filter && (
          <SubHeader filterLayout={filterLayout}>{(filter && children) && children}</SubHeader>
        )
      }

      {
        // (columns?.length > 0 || generate) && (
        <JustifyContent>
          <div>
             {add && (
              <Button
                variant='primary'
                onClick={handleAddClick}
                style={{ marginRight: '8px' }} // Jarak antara tombol "Tambah Data" dan "Copy Point State"
              >
                Tambah Data
              </Button>
            )}
            {copyPointState && (
              <Button
                variant=''
                onClick={handleCopyPointState}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  marginRight: '8px', // Jarak antara teks dan ikon
                }}
              >
                Copy Point State{' '}
                <i className='fa fa-copy' style={{ marginLeft: '4px' }}></i>{' '}
                {/* Jarak antara ikon dan teks */}
              </Button>
            )}
            {generate && (
              <ButtonCustom
                isLoading={generateData}
                disabled={generateData}
                variant={'primary'}
                onClick={handleGenerateClick}
                className="mb-1 me-1 "
              >
                Generate Data
              </ButtonCustom>
            )}
               


            {infoLabels &&

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


            }
            {childrenPosition == 'left' && children}
          </div>

          <div>
            {/* {isUpload && <Button variant='primary' onClick={onShowModal}>Upload Beban KTT</Button>} */}

            <ButtonGroup className='ms-2' aria-label='Basic example'>
              {reload &&
                <Button
                  variant=''
                  onClick={handleReloadData}
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  <i className='fas fa-sync-alt'></i>
                </Button>

              }
              {isUpload &&
                <Button
                  variant=''
                  onClick={onShowModal}
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  <i className="fa-solid fa-upload"></i>
                </Button>

              }
              {column &&

                <Dropdown className='hide-toogle'>
                  <Dropdown.Toggle
                    variant=''
                    id='dropdown-download'
                    className='dropdown-group border-radius-left-0'
                    style={
                      exporting
                        ? { borderRadius: 0 }
                        : { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
                    }
                  >
                    <i className='fa-solid fa-list-check'></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='px-3'>
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
              }
              {
                (exporting) && (
                  <Dropdown className='hide-toogle'>
                    <Dropdown.Toggle
                      variant=''
                      id='dropdown-download'
                      className='dropdown-group border-radius-left-0'
                      style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      disabled={loaderDownload}
                    >

                      <i className='fa fa-download'></i>
                      {loaderDownload &&
                        <i className='fas fa-circle-notch fa-spin ms-2'></i>
                      }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {exportOptions
                        .filter(
                          (f: any) =>
                            exportingOptions == 'all' ||
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
                    </Dropdown.Menu >
                  </Dropdown >
                )
              }
            </ButtonGroup >
          </div >
        </JustifyContent >
        // )
      }
    </>
  );
}


export default React.memo(TableDataListAction)