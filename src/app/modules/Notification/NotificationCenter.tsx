import React from 'react'
import { SideDetail } from '@app/styled/tasks.styled';
import ListNotification from './ListNotification';

const data: any = [
  {
    assignFrom: 'Aminudin Azhar',
    action: 'Added New Task',
    title: 'CRUD Account',
    description: 'Facere ut eum doloremque dicta quae sint pariatur officia sapiente.',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/80.jpg',
    datetime: '1m ago'
  },
  {
    assignFrom: 'Aminudin Azhar',
    action: 'Comment on',
    taskComment: 'Task 1',
    title: '',
    description: 'Veritatis nihil aspernatur nisi culpa quia quidem eaque autem assumenda.',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/509.jpg',
    datetime: '1m ago'
  }
]

function NotificationCenter({ setShowNotification }: any) {
  const handleClose = () => {
    document.body.classList.remove('overflow-hidden');
    setShowNotification(false);
  };

  return (
    <SideDetail
      className='px-4 py-3 task-details'
      data-aos='fade-left'
      data-aos-delay='100'
    >
      <div className='align-items-center d-flex justify-content-between pb-3'>
        <div className='font-weight-bold'>Notifications</div>
        <button
          onClick={handleClose}
          className='btn bg-transparent btn no-outline p-0'
          style={{ fontSize: '18px' }}
        >
          <i className='ffa-solid fa-xmark'></i>
        </button>
      </div>
      <div>
        {data.map((item: any, index: number) => (
          <ListNotification key={index} {...item} />
        ))}
      </div>
    </SideDetail>
  );
}

export default NotificationCenter