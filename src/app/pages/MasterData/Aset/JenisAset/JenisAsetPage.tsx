import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import KategoriItemAsset from '@app/modules/MasterData/JenisAset/KategoriItemAsset'

import { MASTER_DATA_JENIS_ASET, MASTER_DATA_JENIS_ASET_ITEM } from '@app/configs/react-table/master-aset.columns.config';
import { setItem } from '@app/helper/localstorage.helper';

export default function JenisAsetPage() {
  const [itemSelected, setItemSelected] = useState<any>()

  const onSelectItem = (item: any) => {
    setItemSelected(item)
    setItem('jenis_aset', item)
  }
  
  return (
    <>
      <Row>
        <Col md={6}>
          <KategoriItemAsset type='kategori' path='master/aset/ref-aset-jenis' label='Jenis Aset' columnConfig={MASTER_DATA_JENIS_ASET} onSelectItem={onSelectItem} />
        </Col>
        <Col md={6}>
          <KategoriItemAsset type='item' path='master/aset/ref-aset-ex-atr' label='Item Jenis Aset' columnConfig={MASTER_DATA_JENIS_ASET_ITEM} itemSelected={itemSelected} />
        </Col>
      </Row>
    </>
  )
}
