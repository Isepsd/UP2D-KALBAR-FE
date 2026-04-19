import React from 'react'
import { Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import MouseLineIcon from '../Icons/MouseLineIcon'
import { dateTimeFormat } from '@app/helper/time.helper';

function commify(n: any) {
    let parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, ".") + (decimalPart ? "," + decimalPart : "");
}

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

// type Props = {
//     data: any
//     // secondTitle: string;
//     // labelFooter?: string;
//     // sufixTitle: string;
//     // value: any,
//     // classBgCard: string,
//     // routeDetail?: string,
//     // btnDetail?: boolean,
// }

function CardSummaryBottom(data: any) {
    // const navigate = useNavigate()
    // console.log("data")
    // console.log(data[0])
    // console.log(data[1])
    return (
        <Row md={12} className='mb-4 mb-md-0 px-1 mt-1'>

            <Col md={6} className='mb-1 mb-md-1 px-1'>
                <CardSum className="bg-warning">
                    <div className='p-3'>
                        <Title style={{ fontSize: "1.3rem" }}>{`${data[0].beban_max_siang > 0 ? commify(data[0].beban_max_siang) + " MW" : '-'}`}</Title>
                        <SecondTitle >{data[0].tanggal_max_siang == '01-01-1900 00:00:00 ' ? 'N/A' : dateTimeFormat(data[0].tanggal_max_siang, "DD-MM-YYYY HH:mm:ss")}</SecondTitle>
                    </div>

                    <More className='d-flex align-items-center px-2' >
                        <span style={{ fontSize: "0.8rem" }} className='ms-1'>{data[0].label_max_siang == null ? "Beban Max Siang" : data[0].label_max_siang}</span>
                    </More>
                </CardSum>
            </Col>
            <Col md={6} className='mb-1 mb-md-1 px-1'>
                <CardSum className="bg-warning">
                    <div className='p-3'>
                        <Title style={{ fontSize: "1.3rem" }}>{`${data[1].beban_max_malam > 0 ? commify(data[1].beban_max_malam) + " MW" : '-'}`}</Title>
                        <SecondTitle>{data[1].tanggal_max_malam == '01-01-1900 00:00:00 ' ? 'N/A' : dateTimeFormat(data[1].tanggal_max_malam, "DD-MM-YYYY HH:mm:ss")}</SecondTitle>
                    </div>

                    <More className='d-flex align-items-center px-2' >
                        <span style={{ fontSize: "0.8rem" }} className='ms-1'>{data[1].label_max_malam == null ? "Beban Max Malam" : data[1].label_max_malam}</span>
                    </More>
                </CardSum>
            </Col>


        </Row >


    )
}

export default CardSummaryBottom