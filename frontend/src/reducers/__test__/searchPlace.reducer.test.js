import searchPlacesReducer from '../searchPlaces.reducer';
import {
  FETCH_PLACE_SUCCESS,
  FETCH_PLACE_FAIL,
  FETCH_PLACE_START,
} from '../../utils/constant';
import { placeData } from '../__mock__/data';
import { initialState } from '../searchPlaces.reducer';

describe('check for review reducer', () => {
  it('check for no action', () => {
    expect(
      searchPlacesReducer(initialState, { type: '', payload: '' })
    ).toEqual(initialState);
  });
  it('should return loading state on fetch start', () => {
    expect(
      searchPlacesReducer(initialState, {
        type: FETCH_PLACE_START,
        payload: { result: [] },
      }).loading
    ).toBeTruthy();
  });
  it('should return proper state on fetch success', () => {
    expect(
      searchPlacesReducer(initialState, {
        type: FETCH_PLACE_SUCCESS,
        payload: { result: placeData },
      }).allPlaces
    ).toEqual(placeData);
    expect(
      searchPlacesReducer(initialState, {
        type: FETCH_PLACE_SUCCESS,
        payload: { result: placeData },
      }).loading
    ).toBeFalsy();
    expect(
      searchPlacesReducer(initialState, {
        type: FETCH_PLACE_SUCCESS,
        payload: { result: placeData },
      }).error
    ).toBeFalsy();
  });
  it('should return fail state on fetch fail', () => {
    expect(
      searchPlacesReducer(initialState, {
        type: FETCH_PLACE_FAIL,
        payload: { result: placeData },
      }).error
    ).toBeTruthy();
  });
});
