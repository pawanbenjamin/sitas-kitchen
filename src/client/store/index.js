import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import achars from "./achars";
import singleAchar from "./singleAchar";
import user from "./user";
import cart from "./cart";

const reducer = combineReducers({
  achars,
  singleAchar,
  user,
  cart,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
