import {combineReducers} from "redux"

import login from './loginReducer'
import data from './dataReducer'

export default combineReducers({
    login,
    data
})