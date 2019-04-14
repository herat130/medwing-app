import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddPlace from '../AddPlace';
import { placeData } from '../../reducers/__mock__/data';

Enzyme.configure({ adapter: new Adapter() });

let wrapper, props;
describe('Test Search Place component', () => {
  beforeEach(() => {
    props = {
      deleteMarker: jest.fn(),
      editMarker: jest.fn(),
      addAddress: jest.fn(),
      allPlaces: [],
    };

    wrapper = shallow(<AddPlace {...props} />);
  });

  it('should render error message in case no data', () => {
    expect(wrapper.find('.no-data').length).toBe(1);
    expect(wrapper.find('.no-data').text()).toBe('No data Available');
  });

  it('should render all search place data', () => {
    props.allPlaces = placeData;
    wrapper = shallow(<AddPlace {...props} />);
    expect(wrapper.find('.no-data').length).toBe(0);
    expect(wrapper.find('tbody tr').length).toBe(placeData.length);
    expect(wrapper.find('.edit').length).toBe(placeData.length);
    expect(wrapper.find('.delete').length).toBe(placeData.length);
  });

  it('when edit click set the state and change add button text', () => {
    props.allPlaces = placeData;
    wrapper = shallow(<AddPlace {...props} />);
    const editButton = wrapper.find('.edit').at(0);
    editButton.simulate('click', {
      currentTarget: {
        getAttribute: x => {
          return placeData[0].id;
        },
      },
      preventDefault: () => {},
    });
    expect(wrapper.find('.btn.btn-primary').text()).toBe('Edit Place');
    expect(wrapper.state().editMarkerKey).toBeTruthy();
  });
});
