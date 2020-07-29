import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { connect } from 'react-redux'
import { Input, List, Avatar, Spin, Button } from 'antd'
import { SELECT_REPO, SELECT_SCREEN, SET_SEARCH_TERM, SET_SEARCH_RESULTS, CLEAR_SEARCH } from '../actions'
import { REPO_OVERVIEW_SCREEN } from '../const/screens'
import GithubApi from '../services/github'
import SearchResult from '../components/SearchResult'

const { Search } = Input

function RepoSelectionScreen({
  selectRepo, selectScreen, searchTerm, searchResults,
  searchResultsCount, setSearchTerm, setSearchResults, clearSearch }) {
  const [searching, setSearching] = useState(false)
  // const [repos, setRepos] = useState([])
  // const [reposCount, setReposCount] = useState(0)

  const onSearch = useCallback(term => {
    console.log('onSearch callback', term)

    setSearching(true)

    const github = new GithubApi

    github.findRepos(term)
    .then(({ items, total_count }) => {
      // setRepos(items)
      // setReposCount(total_count)
      setSearchResults(items, total_count)

      setSearching(false)
    })
  })

  const onSearchTermChange = useCallback(event => {
    const newTerm = event.target.value
    setSearchTerm(newTerm)
  })

  const onClearButtonClick = useCallback(event => {
    clearSearch()
  })

  const onRepoClick = repo => {
    selectRepo(repo)
    selectScreen(REPO_OVERVIEW_SCREEN)
  }

  if(searching) {
    return (
      <$>
        <Spin tip="Searching..."/>
      </$>
    )
  }

  const searchResultsJsx = searchResults.map(repo => {
    const title = repo.full_name
    const description = repo.description
    return <SearchResult title={title} description={description} onClick={() => onRepoClick(title)} />
  })

  return (
    <$>
      <Button type="primary" onClick={onClearButtonClick} size="large">Clear</Button>
      <Search
        placeholder="Type in repo name, eg. react"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ width: 400, marginLeft: '30px', marginBottom: '30px' }}
        value={searchTerm}
        onChange={onSearchTermChange}
      />
      {searchResultsJsx}
    </$>
  )
}

const $ = styled.div`
  width: 100%;
`

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    searchTerm: state.repoSelection.searchTerm,
    searchResults: state.repoSelection.searchResults,
    searchResultsCount: state.repoSelection.searchResultsCount
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
    },
    setSearchTerm: term => {
      dispatch({
        type: SET_SEARCH_TERM,
        term
      })
    },
    setSearchResults: (searchResults, searchResultsCount) => {
      dispatch({
        type: SET_SEARCH_RESULTS,
        searchResults,
        searchResultsCount
      })
    },
    clearSearch: () => {
      dispatch({
        type: CLEAR_SEARCH
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoSelectionScreen)