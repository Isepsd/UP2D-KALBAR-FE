import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MouseLineIcon from '../Icons/MouseLineIcon'

const CardSum = styled.div`
  color: #FFF;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 23.9789px;
`
const SecondTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
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
  labelFooter?: string;
  sufixTitle?: string;
  value: any,
  classBgCard?: string,
  routeDetail?: string,
  btnDetail?: boolean,
}

function CardSummary({ secondTitle, sufixTitle, value = 0, classBgCard = '', routeDetail, btnDetail = true, labelFooter = undefined }: Props) {
  const navigate = useNavigate()

  return (
    <CardSum className={`${classBgCard}`}>
      <div className='p-4'>
        <Title>{`${value} ${sufixTitle}`}</Title>
        <SecondTitle>{secondTitle}</SecondTitle>
      </div>
      {
        btnDetail && (
          <More className='d-flex align-items-center px-3 cursor-pointer' onClick={() => routeDetail && navigate(routeDetail)}>
            <div style={{ width: '14px' }}><MouseLineIcon /></div> <span className='ms-1'>Detail</span>
          </More>
        )
      }
      {
        labelFooter && (
          <More className='d-flex align-items-center px-3' >
            <div style={{ width: '14px' }}><MouseLineIcon /></div> <span className='ms-1'>{labelFooter}</span>
          </More>
        )
      }
    </CardSum>
  )
}

export default CardSummary