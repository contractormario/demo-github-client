import React from 'react'
import styled from 'styled-components'

export default function Release({ name, tag }) {
  return (
    <$>
      release {tag} {name}
    </$>
  )
}
const $ = styled.div`
  border: 1px solid #eee;
  margin-bottom: 10px;
`
