import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProgressBarStats {
  title: string;
  value: any;
  width: any;
  max?: any,
  min?: any,
  realValue?: any,
  minColor?: string
  maxColor?: string
}

export default function ProgressBarStats({
  title = 'Label Info',
  value = 0,
  width = '100%',
  max = 0,
  min = 0,
  realValue,
  minColor = "danger",
  maxColor = "warning"
}: IProgressBarStats) {
  const [color, setColor] = useState<string>('success')
  useEffect(() => {
    if (realValue) {
      let color: any = "success";

      if (realValue < min) {
        color = minColor
      } else if (realValue > max) {
        color = maxColor
      }
      setColor(color)
    }

  }, [realValue])
  return (
    <>
      <div className='mb-3'>
        <div className="d-flex justify-content-between">
          <Title className='elipsis' title={title}>{title}</Title>
          <Value><span className={color}>{value}</span></Value>
        </div>
        <div>
          <div className='progress-bar-container'>
            <div
              className={`progress-bar-indicator progress-bar-indicator-${color}`}
              style={{ width: width }}
            ></div>
          </div>
          {/* <div className='progress-bar-container'>
            <div
              className='progress-bar-indicator'
              style={{ width: width }}
            ></div>
          </div> */}
        </div>
      </div>
    </>
  );
}

const Title = styled.h6`
  width: 85%;
  margin-bottom: 0;
`;


const Value = styled.div`
  width: auto;
  text-align: right;
`;
