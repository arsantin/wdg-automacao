import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const reducer = combineReducers({  
  user: UserReducer  
});

export default persistReducer(persistConfig, reducer);



