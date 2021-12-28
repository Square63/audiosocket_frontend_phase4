import { combineReducers } from "redux";
import { allFiltersReducer } from './filterReducers'
import { allTracksReducer } from "./trackReducers";
import { authReducer } from './authReducers';
import { allPlaylitsReducer } from "./playlistReducers";

const reducer = combineReducers ({
	allFilters: allFiltersReducer,
	allTracks: allTracksReducer,
	allPlaylists: allPlaylitsReducer,
	auth: authReducer
})

export default reducer;