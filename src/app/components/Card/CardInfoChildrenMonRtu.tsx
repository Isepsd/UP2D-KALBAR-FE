import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MouseLineIcon from '../Icons/MouseLineIcon'

const CardSum = styled.div`
  color: #FFF;
`
// const SecondTitle = styled.div`
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;
// `
const More = styled.div`
    background: rgb(27 26 26 / 20%);
    box-sizing: border-box;
    padding: 6px;
    height: 28px;
    line-height: 0;
`

const Titles = styled.div`
    background: rgb(27 26 26 / 20%);
    box-sizing: border-box;
    padding: 6px;
    height: 28px;
    line-height: 0;
    font-weight: 700;
`

type Props = {
  children: any,
  classBgCard: string,
  routeDetail?: string
  detail?: boolean
  title: string
  icon: string
}

function CardInfoChildren({ icon, title, classBgCard = '', routeDetail, children, detail = true }: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (routeDetail) {
      const kesimpulan = routeDetail === 'Total RTU' ? 'VALID' : routeDetail === 'Total OOP' ? 'INVALID' : '';
      navigate(routeDetail, { state: { kesimpulan } });
    }
  };

  return (
    <CardSum className={`${classBgCard}`}>
      <Titles className='d-flex align-items-center px-3 cursor-pointer text-uppercase'>
        <span className=''><i className={`me-2 ${icon}`}></i>{title}</span>
      </Titles>
      {children}
      {detail &&
        <More className='d-flex align-items-center px-3 cursor-pointer' onClick={handleNavigate}>
          <div style={{ width: '14px' }}><MouseLineIcon /></div> <span className='ms-1'>VIEW MORE</span>
        </More>
      }
    </CardSum>
  );
}


export default CardInfoChildren