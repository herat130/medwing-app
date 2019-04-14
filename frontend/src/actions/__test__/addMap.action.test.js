import {
  FETCH_PLACE_START,
  FETCH_PLACE_SUCCESS,
  FETCH_PLACE_FAIL,
} from '../../utils/constant';
import * as fetchHelper from '../../utils/fetchWrapper';
import {
  addAddress,
  deleteMarker,
  // updateMarker,
  getAllAddress,
  fetchStart,
} from '../addMap.action';
import { placeData } from '../../reducers/__mock__/data';

describe('recipes action test suits', () => {
  it('places fetch success and fail test using promise', () => {
    const _url = 'mock url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise(resolve => resolve({ data: placeData }));
      })
      .mockImplementationOnce(_url => {
        return new Promise((resolve, reject) => reject());
      });
    getAllAddress().then(v => {
      expect(v).toEqual({
        type: FETCH_PLACE_SUCCESS,
        payload: { result: placeData },
      });
    });
    getAllAddress().then(v => {
      expect(v).toEqual({
        type: FETCH_PLACE_FAIL,
      });
    });
    getAllAddress();
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('add places success', () => {
    const _url = 'mock url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise(resolve => resolve({ data: placeData, status: 'SUCCESS' }));
      })
    addAddress('sample+add').then(v => {
      expect(v).toEqual({
        type: FETCH_PLACE_SUCCESS,
        payload: { result: placeData },
      });
    });

    addAddress('sample-key');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('add place faililure', () => {
    const _url = 'mock url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise((resolve, reject) => reject());
      });
    addAddress('sample-key').then(v => {
      expect(v).toEqual({
        type: FETCH_PLACE_FAIL,
      });
    });
    spy.mockClear();
  });

  it('add place faliure in case of other then SUCCESS status', () => {
    const _url = 'mock url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise(resolve => resolve({ data: placeData, status: 'SERVER_ERROR' }));
      });
    addAddress('sample-key').then(v => {
      expect(v).toEqual({
        type: FETCH_PLACE_FAIL,
      });
    });
    spy.mockClear();
  })

  it('delete places success', () => {
    const _url = 'mock url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise(resolve => resolve({ data: placeData, status: 'SUCCESS' }));
      })

    deleteMarker('sample+key').then(v => {
      expect(v).toEqual({
        type: FETCH_PLACE_SUCCESS,
        payload: { result: placeData },
      });
    });

    deleteMarker('sample-key');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('delete places failiure', () => {
    const _url = 'mock url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise((resolve, reject) => reject());
      });

    deleteMarker('sample-key').then(v => {
      expect(v).toEqual({
        type: FETCH_PLACE_FAIL,
      });
    });
    deleteMarker('sample-key');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('places start action test case', () => {
    const expectedAction = {
      type: FETCH_PLACE_START,
    };
    expect(fetchStart()).toEqual(expectedAction);
  });
});
