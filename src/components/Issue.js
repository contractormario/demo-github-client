import React from 'react'
import styled from 'styled-components'
import { Tag } from 'antd'

export default function Issue({ number, title, body, labels, state }) {
  const labelsJsx = labels.map(label => {
    return <Tag color={`#${label.color}`}>{label.name}</Tag>
  })

  return (
    <$>
      <div>issue <Number>#{number}</Number><Title>{title}</Title></div>
      <div>{labelsJsx}</div>
    </$>
  )
}

const $ = styled.div`
  border: 1px solid #eee;
  margin-bottom: 10px;
`
const Number = styled.div`
  display: inline-block;
  margin-right: 10px;
`
const Title = styled.div`
  display: inline-block;
  font-weight: bold;
`
