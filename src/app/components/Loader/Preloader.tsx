import React from 'react'
import styled from 'styled-components'

export default function Preloader({image}:any) {
  return (
    <PreloaderContainer className='preloader'>
      {
        image ?
        <img className='circle bounce-in' src={image} alt="" width={50} />
        :
        <>Loading&#8230;</>
      } 
    </PreloaderContainer>
  )
}

const PreloaderContainer = styled.div`
  
`