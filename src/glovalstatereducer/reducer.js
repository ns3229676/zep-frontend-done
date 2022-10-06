import {combineReducers} from 'redux'
import userReducer from './glovalstate'

const rootStore = combineReducers({
    userReducer
})

export default rootStore;