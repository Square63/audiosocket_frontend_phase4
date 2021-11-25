import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import { thunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { middleware } from "yargs";
import reducers from "./reducers/reducers";
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'


const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV != "production") {
		const { composeWithDevTools } = require('redux-devtools-extension')
		return composeWithDevTools(applyMiddleware(...middleware))
	}

	return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
	if (action.type == HYDRATE) {
		const nextState = {
			...state,
			...action.payload
		}

		return nextState
	} else {
		return reducers(state, action)
	}
}

const initStore = () => {
	return createStore(reducer, applyMiddleware(createPromise(), thunk, createLogger()))
}

export const wrapper = createWrapper(initStore)