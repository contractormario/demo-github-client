import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import RepoSelectionScreen from './containers/RepoSelectionScreen'
import RepoOverviewScreen from './containers/RepoOverviewScreen'
import {
  REPO_SELECTION_SCREEN,
  REPO_OVERVIEW_SCREEN
} from './const/screens'

function renderScreen(screen) {
  switch(screen) {
    case REPO_OVERVIEW_SCREEN:
      return <RepoOverviewScreen/>
    case REPO_SELECTION_SCREEN:
    default:
      return <RepoSelectionScreen/>
  }
}

function App({ screen }) {
  return (
    <$>
      {renderScreen(screen)}
    </$>
  )
}

const $ = styled.div`
  margin-top: 50px;
  width: 800px;
  height: 800px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    screen: state.screen,
  }
}

export default connect(mapStateToProps, null)(App)