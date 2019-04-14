import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { placeData } from '../../reducers/__mock__/data';
import ConnectedFindPlaces, { FindPlaces } from '../FindPlaces';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  searchPlaces: {
    loading: false,
    error: false,
    allPlaces: placeData,
  },
};
const store = mockStore(initialState);
Enzyme.configure({ adapter: new Adapter() });

describe('find place container component testing', () => {
  let wrapper;
  it('should call fetch api on render', () => {
    const mockFetch = jest.fn();
    wrapper = shallow(<FindPlaces getAllAddress={mockFetch} />);
    expect(mockFetch.mock.calls.length).toBe(1)
  });

  it('should render both the component', () => {
    const mockFetch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <ConnectedFindPlaces getAllAddress={mockFetch} />
      </Provider>
    );
    expect(wrapper.find('.map').length).toBe(1);
    expect(wrapper.find('AddPlace').length).toBe(1);
  });
});