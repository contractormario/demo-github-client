import { SELECT_SCREEN } from '../actions'
import { REPO_SELECTION_SCREEN, REPO_OVERVIEW_SCREEN } from '../const/screens'
import RepoSelectionReducer from './RepoSelectionReducer'
import RepoOverviewReducer from './RepoOverviewReducer'

const initialState = {
  screen: REPO_SELECTION_SCREEN,
  // screen: REPO_OVERVIEW_SCREEN,
  repoSelection: RepoSelectionReducer(undefined, {}),
  repoOverview: RepoOverviewReducer(undefined, {}),
}

export default function rootReducer(_state = initialState, action) {
  let state = { ..._state }

  state.repoSelection = RepoSelectionReducer(state.repoSelection, action)
  state.repoOverview = RepoOverviewReducer(state.repoOverview, action)

  switch(action.type) {
    case SELECT_SCREEN: {
      state.screen = action.screen
    }
  }

  return state
}