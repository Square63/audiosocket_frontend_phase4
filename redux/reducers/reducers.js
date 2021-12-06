import { combineReducers } from "redux";
import { allFiltersReducer } from './filterReducers'
import { allTracksReducer } from "./trackReducers";
import { authReducer } from './authReducers';

const reducer = combineReducers ({
	allFilters: allFiltersReducer,
	allTracks: allTracksReducer,
	auth: authReducer
})

export default reducer;