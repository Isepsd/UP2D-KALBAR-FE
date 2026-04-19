import React from 'react'

export default function JustifyContent(props:any) {
  return (
    <div className="d-flex justify-content-between">{props.children}</div>
  )
}
