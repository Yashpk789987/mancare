import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import MainReducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk);

const store = createStore(MainReducer, middleware);

export default store;
