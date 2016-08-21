import { combineReducers } from 'redux'

import sketch from './sketchReducer'
import settings from './settingsReducer'

export default combineReducers({
  sketch,settings
})
