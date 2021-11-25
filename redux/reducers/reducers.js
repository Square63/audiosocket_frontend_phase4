import { combineReducers } from "redux";
import { allFiltersReducer } from './filterReducers'
import { allTracksReducer } from "./trackReducers";

const reducer = combineReducers ({
	allFilters: allFiltersReducer,
	allTracks: allTracksReducer
})

export default reducer;