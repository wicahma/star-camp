import { combineReducers } from 'redux'
import mainStoreReducer from './mainStoreReducers';


const rootReducer = combineReducers({
  mainStore: mainStoreReducer // ini nama yang dimasukkan setelah state jadinya state.handleAPI  
})

export default rootReducer;
