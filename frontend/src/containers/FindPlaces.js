import React from 'react';
import { connect } from 'react-redux';
import AddPlace from '../components/AddPlace';
// import MyMaps from '../components/MyMaps';
import '../assets/styles/findplaces.scss';
import {
  addAddress,
  deleteMarker,
  updateMarker,
  getAllAddress,
  fetchStart,
} from '../actions/addMap.action';
const MyMaps = React.lazy(() => import('../components/MyMaps'));
/**
 * below component is wrapper for map and search components
 */
export class FindPlaces extends React.Component {
  componentDidMount() {
    /** fetch all the places available on server */
    this.props.getAllAddress();
  }

  addAddress = searchPlace => {
    this.props.addAddress(searchPlace);
  };

  editMarker = (id, updatedSearch) => {
    this.props.updateMarker(id, updatedSearch);
  };

  deleteMarker = id => {
    this.props.deleteMarker(id);
  };

  render() {
    const { allPlaces, loading } = this.props;
    return (
      <div className="row findplaces">
        <div className="column-6 map">
          <React.Suspense fallback={<div> Loading ...</div>}>
            <MyMaps allPlaces={allPlaces} />
          </React.Suspense>
        </div>
        <div className="column-6 details">
          <AddPlace
            loading={loading}
            addAddress={this.addAddress}
            deleteMarker={this.deleteMarker}
            editMarker={this.editMarker}
            allPlaces={allPlaces}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    allPlaces: state.searchPlaces.allPlaces,
  };
};

const mapStateToDispatch = dispatch => {
  return {
    addAddress: (searchPlace, editKey) => {
      dispatch(fetchStart());
      addAddress(searchPlace, editKey).then(action => dispatch(action));
    },
    deleteMarker: id => {
      dispatch(fetchStart());
      deleteMarker(id).then(action => dispatch(action));
    },
    updateMarker: (id, address) => {
      dispatch(fetchStart());
      updateMarker(id, address).then(action => dispatch(action));
    },
    getAllAddress: () => {
      dispatch(fetchStart());
      getAllAddress().then(action => dispatch(action));
    },
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(FindPlaces);
