import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MapContainer } from '../MyMaps';
import { placeData } from '../../reducers/__mock__/data';
Enzyme.configure({ adapter: new Adapter() });

let wrapper, props;
describe('should render map properly', () => {
  beforeEach(() => {
    props = {
      allPlaces: placeData,
    };
  });
  it('should render all marker', () => {
    wrapper = shallow(<MapContainer {...props} />);
    expect(wrapper.find('Marker').length).toBe(placeData.length);
  });
});
