import React from 'react'
import styled from 'styled-components'

export default function SearchResult({ title, description, onClick }) {
  return (
    <$ onClick={onClick}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </$>
  )
}

const $ = styled.div`
  border: 1px solid #eee;
  margin-bottom: 10px;
  cursor: pointer;
  width: 600px;
  padding: 15px;

  &:hover {
    background: #1890ff;
    color: #fff;
  }
`
const Title = styled.div`
  font-weight: bold;
`
const Description = styled.div`
`