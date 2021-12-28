import {
    ALL_FILTERS_SUCCESS,
    ALL_FILTERS_FAILURE,
    CLEAR_ERRORS
} from '../constants/filterConstants';

export const allFiltersReducer = (state= {filters: []}, action) => {
  switch (action.type) {
    case ALL_FILTERS_SUCCESS:
      return {
        filtersCount: 7,
        resPerPage: 1,
        filters: [action.payload]
      }
    case ALL_FILTERS_FAILURE:
      return {
        error: action.payload.error
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
        return state;
  }
}