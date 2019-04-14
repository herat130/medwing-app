import {
  FETCH_PLACE_START,
  FETCH_PLACE_FAIL,
  FETCH_PLACE_SUCCESS,
} from '../utils/constant';

export const initialState = {
  loading: false,
  error: false,
  allPlaces: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLACE_START:
      return { ...state, loading: true };
    case FETCH_PLACE_SUCCESS:
      const results = action.payload.result || [];
      return { ...state, allPlaces: results, loading: false, error: false };
    case FETCH_PLACE_FAIL:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
}
