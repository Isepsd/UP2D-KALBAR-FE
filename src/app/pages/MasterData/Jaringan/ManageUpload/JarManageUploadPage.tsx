import React from 'react';
import { useSelector } from 'react-redux';
// import FormUpload from '@app/modules/MasterData/FormUpload';
import FormUpload from './FormUpload';

export default function JarManageUploadPage() {
  const { currentUser } = useSelector((state: any) => state.auth);

  const menu = [
    {
      name: 'Master Unit Pembangkit',
      id_ref_jenis_lokasi: 1,
      name_ref_jenis_lokasi: 'unit-pembangkit',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 1 }
    },
    {
      name: 'Master Pembangkit',
      id_ref_jenis_lokasi: 2,
      name_ref_jenis_lokasi: 'pembangkit',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 2 }
    },
    {
      name: 'Master Gardu Induk',
      id_ref_jenis_lokasi: 4,
      name_ref_jenis_lokasi: 'gardu-induk',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 4 }
    },
    {
      name: 'Master Trafo GI',
      id_ref_jenis_lokasi: 5,
      name_ref_jenis_lokasi: 'trafo-gi',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 5 }
    },
    {
      name: 'Master Penyulang',
      id_ref_jenis_lokasi: 6,
      name_ref_jenis_lokasi: 'penyulang',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 6 }
    },
    {
      name: 'Master Gardu Hubung',
      id_ref_jenis_lokasi: 36,
      name_ref_jenis_lokasi: 'gardu-hubung',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 36, fungsi_lokasi: 'GH' }
    },
    {
      name: 'Master Key Point',
      id_ref_jenis_lokasi: 36,
      name_ref_jenis_lokasi: 'keypoint',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 36 }
    },
    {
      name: 'Master Zone',
      id_ref_jenis_lokasi: 36,
      name_ref_jenis_lokasi: 'zona',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 36, fungsi_lokasi: 'ZONE' }
    },
    {
      name: 'Master Section',
      id_ref_jenis_lokasi: 36,
      name_ref_jenis_lokasi: 'section',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 36, fungsi_lokasi: 'SECTION' }
    },
    {
      name: 'Master Segment',
      id_ref_jenis_lokasi: 36,
      name_ref_jenis_lokasi: 'segment',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 36, fungsi_lokasi: 'SEGMENT' }
    },
    // { name: 'Master Lateral', id_ref_jenis_lokasi: 0 },
    {
      name: 'Master Gardu Distribusi',
      id_ref_jenis_lokasi: 10,
      name_ref_jenis_lokasi: 'gardu-distribusi',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 10 }
    },
    {
      name: 'Master Trafo GD',
      id_ref_jenis_lokasi: 14,
      name_ref_jenis_lokasi: 'trafo-gardu-distribusi',
      filterParams: { id_user_entri: currentUser.id_user, id_ref_jenis_lokasi: 14 }
    },
  ];

  return (
    <>
      {menu.map((item: any, index: number) => (
        <FormUpload
          key={index}
          name={item.name}
          idRefJenisLokasi={item.id_ref_jenis_lokasi}
          nameRefJenisLokasi={item.name_ref_jenis_lokasi}
          filterParams={item.filterParams}
        />
      ))}
    </>
  );
}
