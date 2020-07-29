import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { connect } from 'react-redux'
import { Button, Spin } from 'antd'
import { SELECT_REPO, SELECT_SCREEN } from '../const/actions'
import { REPO_SELECTION_SCREEN } from '../const/screens'
import GithubApi from '../services/GithubApi'
import Issue from '../components/Issue'
import Release from '../components/Release'

function RepoOverviewScreen({ selectedRepo, selectScreen }) {
  const [loading, setLoading] = useState(true)
  const [issues, setIssues] = useState([])
  const [releases, setReleases] = useState([])

  useEffect(() => {
    const github = new GithubApi()

    github.getRepoIssues(selectedRepo)
    .then(issues => {
      setIssues(issues)
      return github.getRepoReleases(selectedRepo)
    })
    .then(releases => {
      setReleases(releases)
      setLoading(false)
    })
  }, [selectedRepo])

  const onGoBackButtonClick = useCallback(() => {
    selectScreen(REPO_SELECTION_SCREEN)
  }, [selectScreen])

  if(loading) {
    return (
      <$>
        <Spin tip="Retrieving repo data..."/>
      </$>
    )
  }

  const issuesJsx = issues.slice(0, 10).map(issue => {
    const {number, title, body, labels, state} = issue
    return <Issue key={number} number={number} title={title} body={body} labels={labels} state={state} />
  })

  const releasesJsx = releases.slice(0, 10).map(rel => {
    const {name, tag} = rel
    return <Release key={name} name={name} tag={tag} />
  })

  return (
    <$>
      <Header>
        <Button type="primary" onClick={onGoBackButtonClick} size="large" style={{ marginRight: '30px' }}>Go Back</Button> <RepoName>{selectedRepo}</RepoName>
      </Header>
      <h2>Releases</h2>
      {releasesJsx}
      <h2>Issues</h2>
      {issuesJsx}
    </$>
  )
}

const $ = styled.div`
  width: 100%;
`
const RepoName = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 16pt;
`
const Header = styled.div`
  margin-bottom: 30px;
`

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    selectedRepo: state.repoSelection.selectedRepo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectRepo: repo => {
      dispatch({
        type: SELECT_REPO,
        repo
      })
    },
    selectScreen: screen => {
      dispatch({
        type: SELECT_SCREEN,
        screen
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoOverviewScreen)