import { combineReducers } from "redux"; // Note the lowercase 'c'
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
