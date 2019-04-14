import { fetchWrapper } from '../utils/fetchWrapper';
import {
  LOCATION_API,
  FETCH_PLACE_FAIL,
  FETCH_PLACE_SUCCESS,
  STATUS_MSG_ENUM,
  FETCH_PLACE_START,
} from '../utils/constant';
import toastr from 'toastr';

export const getAllAddress = () => {
  const url = `${LOCATION_API}/fetch`;
  return fetchWrapper(url)
    .then(result => {
      return responseSuccess(result.data);
    })
    .catch(err => {
      return responseFail();
    });
};

export const addAddress = (address) => {
  const url = `${LOCATION_API}/add`;
  return fetchWrapper(url, 'post', { address: address })
    .then(result => {
      if (chkAndDisplayMsg(result.status, 'add')) {
        return responseSuccess(result.data);
      } else {
        return responseFail();
      }
    })
    .catch(error => {
      toastr.warning(STATUS_MSG_ENUM.SERVER_ERROR, 'Error');
      return responseFail();
    });
};

const chkAndDisplayMsg = (status, operation = 'add') => {
  if (status === 'SUCCESS') {
    toastr.success(`${STATUS_MSG_ENUM[status]} ${operation}`, 'Success');
    return true;
  } else {
    toastr.error(STATUS_MSG_ENUM[status], 'Error');
    return false;
  }
};

const responseSuccess = (result) => {
  return {
    type: FETCH_PLACE_SUCCESS,
    payload: { result },
  };
};

const responseFail = () => {
  return {
    type: FETCH_PLACE_FAIL,
  };
};

export const deleteMarker = id => {
  const url = `${LOCATION_API}/delete`;
  return fetchWrapper(url, 'delete',{id})
    .then(result => {
      if (chkAndDisplayMsg(result.status, 'delete')) {
        return responseSuccess(result.data);
      } else {
        return responseFail();
      }
    })
    .catch(error => {
      toastr.warning(STATUS_MSG_ENUM.SERVER_ERROR, 'Error');
      return responseFail();
    });
};

export const updateMarker = (id, address) => {
  const url = `${LOCATION_API}/update`;
  return fetchWrapper(url, 'put', { id, address })
    .then(result => {
      if (chkAndDisplayMsg(result.status)) {
        return responseSuccess(result.data);
      } else {
        return responseFail();
      }
    })
    .catch(error => {
      toastr.warning(STATUS_MSG_ENUM.SERVER_ERROR, 'Error');
      return responseFail();
    });
};

export const fetchStart = () => {
  return {
    type: FETCH_PLACE_START,
  };
};
