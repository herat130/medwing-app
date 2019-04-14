export const FETCH_PLACE_SUCCESS = 'FETCH_PLACE_SUCCESS';
export const FETCH_PLACE_FAIL = 'FETCH_PLACE_FAIL';
export const FETCH_PLACE_START = 'FETCH_PLACE_START';

export const LOCATION_API = process.env.REACT_APP_API;

export const MAP_INITIAL_LOCATION = {
  lat: 51.031947,
  lng: 11.098869,
};

export const STATUS_MSG_ENUM = {
  SUCCESS: 'Hurray !!! searched place has been',
  DUPLICATE: 'OPPS!!! place Allready exists ',
  SERVER_ERROR: 'OPPS!!! server issue, please try after some time',
  ID_NOT_FOUND: 'OPPS !!! place not found , please refresh and check',
  ZERO_RESULTS: 'OPPS!!! Search place does not exists',
};
