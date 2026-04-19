import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MouseLineIcon from '../Icons/MouseLineIcon'

const CardSum = styled.div`
  color: #FFF;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
`
const SecondTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.72rem;
`
const More = styled.div`
    background: rgb(27 26 26 / 20%);
    box-sizing: border-box;
    padding: 6px;
    height: 28px;
    line-height: 0;
`

type Props = {
  secondTitle: string;
  sufixTitle: string;
  value: any,
  classBgCard: string,
  routeDetail? : string,
  btnDetail? : boolean,
}

function CardSummaryMap({secondTitle, sufixTitle, value = 0, classBgCard = '', routeDetail, btnDetail = true}: Props) {
  const navigate = useNavigate()

  return (
    <CardSum className={`${classBgCard}`}>
      <div className='p-2'>
        <Title>{`${value} ${sufixTitle}`}</Title>
        <SecondTitle>{secondTitle}</SecondTitle>
      </div>
      {
        btnDetail && (
          <More className='d-flex align-items-center px-3 cursor-pointer' onClick={()=> routeDetail && navigate(routeDetail) }>
            <div style={{width: '14px'}}><MouseLineIcon /></div> <span className='ms-1'>Detail</span>
          </More>
        )
      }
    </CardSum>
  )
}

export default CardSummaryMap