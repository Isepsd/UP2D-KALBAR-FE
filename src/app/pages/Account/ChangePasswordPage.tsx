import LazyImage from '@app/components/Image/LazyImage';
import { cdnUrl } from '@app/helper/cdn.helper';
import UserFormChangePasswword from '@app/modules/Account/UserFormChangePasswword';
import React from 'react';
import { Row, Card, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ChangePasswordPage() {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { application } = useSelector((state: any) => state.ui);

  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6 mx-auto'>

          <Card className='card-widget'>
            {/* <Card.Header>Penyulang</Card.Header> */}
            <Card.Body>
              <Alert variant='danger' className='text-center' style={{ marginBottom: 0 }}>
                <Alert.Link href="#">Peringatan masalah keamanan akun : </Alert.Link> Password yang digunakan sudah tidak aman lagi ! Perubahan password terakhir <b>{currentUser?.days ? currentUser?.days : 30} hari</b> yang lalu.
                Mengingat begitu pentingnya keamanan akun, disarankan untuk selalu <b>mengupdate password</b> secara berkala dalam jangka waktu <b>maksimal {application?.max_change_life ? application?.max_change_life : 30} hari</b>. <br />
                Silahkan ubah password terlebih dahulu sebelum melanjutkan akses ke aplikasi.
              </Alert>
              <Row className='animate__animated animate__fadeIn mt-4'>
                <div className='col-md-3 management-separator'>
                  <div className='w-100'>
                    <LazyImage
                      src={`${cdnUrl(currentUser?.avatar)}`}
                      alt=''
                      width={82}
                      height={82}
                      className='img-thumbnail image-circle image-profile-user'
                    // style={{ height: '8.5rem' }}
                    />
                  </div>
                </div>
                <div className='col-md-9 mb-2'>
                  <h5 className='py-1'>
                    <i className='fa-solid fa-lock'></i> Ubah Password
                  </h5>
                  <hr />
                  <UserFormChangePasswword />
                </div>
              </Row>
            </Card.Body>
          </Card>

        </div>
      </div>
    </>
  );
}
