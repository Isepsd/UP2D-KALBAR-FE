import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import ResetPasswordForm from '@app/modules/Users/ResetPasswordForm';
import { getByIdPath } from '@app/services/main.service';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UsersSetNewPassword() {
  const source = axios.CancelToken.source();
  const { id } = useParams();
  
  const [dataSelected, setDataSelected] = useState<any>();

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath('users', id, source.token);
      setDataSelected(req?.results);
      setDataSelected(req?.results)
    } catch {}
  };

  useEffect(() => {
    getDataById()
  
    return () => {
      setDataSelected(undefined)
      source.cancel()
    }
  }, [id])
  

  return (
    <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-2 management-separator'>
          <div className='w-75 mx-auto'>
            <img
              src='/static/avatar.png'
              alt=''
              className='img-thumbnail rounded-circle'
            /> 
          </div>
          <div className='text-center mt-2'>
            <h4>{dataSelected?.fullname}</h4>
            <p className="text-muted">@{dataSelected?.username}</p>
          </div>
        </div>
        <div className='col-md-8'>
          <ResetPasswordForm />
        </div>
      </Row>
  )
}
