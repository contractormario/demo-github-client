import { SELECT_SCREEN } from '../const/actions'
import { REPO_SELECTION_SCREEN } from '../const/screens'
import RepoSelectionReducer from './RepoSelectionReducer'
import RepoOverviewReducer from './RepoOverviewReducer'

const initialState = {
  screen: REPO_SELECTION_SCREEN,
  repoSelection: RepoSelectionReducer(undefined, {}),
  repoOverview: RepoOverviewReducer(undefined, {}),
}

export default function RootReducer(_state = initialState, action) {
  let state = { ..._state }

  state.repoSelection = RepoSelectionReducer(state.repoSelection, action)
  state.repoOverview = RepoOverviewReducer(state.repoOverview, action)

  switch(action.type) {
    case SELECT_SCREEN: {
      state.screen = action.screen
      break;
    }
    default:
  }

  return state
}