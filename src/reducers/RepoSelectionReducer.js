import { SELECT_REPO, SET_SEARCH_TERM, SET_SEARCH_RESULTS, CLEAR_SEARCH } from '../actions'

const initialState = {
  selectedRepo: null,
  searchResults: [],
  searchResultsCount: 0,
  searchTerm: null,
  // searchTerm: 'react',
}

export default function RepoSelectionReducer(state = initialState, action) {
  console.log('RepoSelectionReducer', state, action)

  switch(action.type) {
    case SELECT_REPO: {
      return {
        ...state,
        selectedRepo: action.repo
      }
    }
    case SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.term
      }
    }
    case SET_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.searchResults,
        searchResultsCount: action.searchResultsCount
      }
    }
    case CLEAR_SEARCH: {
      return {
        ...state,
        searchTerm: null,
        searchResults: [],
        searchResultsCount: 0
      }
    }
  }

  return state
}
