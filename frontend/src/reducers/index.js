import { combineReducers } from 'redux';
import searchPlaces from './searchPlaces.reducer';

export const allReducers = combineReducers({
  searchPlaces,
});
