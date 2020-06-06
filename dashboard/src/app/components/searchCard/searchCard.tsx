import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { Card, Elevation, InputGroup } from '@blueprintjs/core'
import * as actions from './ducks/actions'

const Spacer = styled.div`
  height: 1em;
`


interface Props {
  onEntitySearchBlur: any;
  onFindingsSearchBlur: any;
}

const SearchCard: React.SFC<Props> = (props) => {
  const {
    onEntitySearchBlur,
    onFindingsSearchBlur
  } = props

  return (
    <Card elevation={Elevation.TWO}>
      <InputGroup
        type="search"
        leftIcon='search'
        placeholder='Search for Entity Keyword'
        onBlur={onEntitySearchBlur}
      />
      <Spacer />
      <InputGroup
        type="search"
        leftIcon='search'
        placeholder='Search for Findings Keyword'
        onBlur={onFindingsSearchBlur}
      />
    </Card>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onEntitySearchBlur: (event: any) => dispatch(actions.setEntityKeywords(event.target.value)),
    onFindingsSearchBlur: (event: any) => dispatch(actions.setFindingsKeywords(event.target.value))
  }
}

export default connect(null, mapDispatchToProps)(SearchCard)
