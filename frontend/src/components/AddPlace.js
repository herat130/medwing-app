import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

library.add([faEdit, faTrashAlt, faWindowClose]);
export default class AddPlace extends React.Component {
  state = {
    searchPlace: '',
    editMarkerKey: null,
  };

  addAddress = event => {
    event.preventDefault();
    const { editMarkerKey, searchPlace } = this.state;
    if (editMarkerKey) {
      this.props.editMarker(editMarkerKey, searchPlace);
    } else {
      this.props.addAddress(searchPlace);
    }
    this.setState({
      searchPlace: '',
      editMarkerKey: null,
    });
  };

  editMarker = event => {
    const key = event.currentTarget.getAttribute('data-key');
    const place = event.currentTarget.getAttribute('data-place');
    this.setState({
      searchPlace: place,
      editMarkerKey: key,
    });
    event.preventDefault();
  };

  deleteMarker = event => {
    const key = event.currentTarget.getAttribute('data-key');
    if (window.confirm('Confirm Deletion!!!')) {
      this.props.deleteMarker(key);
      this.setState({
        searchPlace: '',
        editMarkerKey: null,
      });
    }
    event.preventDefault();
  };

  renderAllSearchPlaces = () => {
    const { allPlaces } = this.props;
    const { editMarkerKey } = this.state;
    if (allPlaces.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="text-center no-data">
            No data Available
          </td>
        </tr>
      );
    }
    return (allPlaces || []).map(place => {
      return (
        <tr key={place.id}>
          <td style={{ width: '30%' }}>{place.place}</td>
          <td style={{ width: '30%' }}>{place.lat}</td>
          <td style={{ width: '30%' }}>{place.lng}</td>
          <td style={{ width: '10%' }} className="text-center">
            <span
              style={{
                display: editMarkerKey === place.id ? 'none' : 'inline-block',
              }}
              className="text-center edit"
              onClick={this.editMarker}
              data-key={place.id}
              data-place={place.place}
              data-lat={place.lat}
              data-lng={place.lng}>
              <FontAwesomeIcon icon="edit" />
            </span>
            <span
              style={{
                display: editMarkerKey === place.id ? 'inline-block' : 'none',
              }}
              className="text-center cancel-edit"
              onClick={this.cancelEdit}>
              <FontAwesomeIcon icon="window-close" />
            </span>
            <span
              className="text-center delete"
              onClick={this.deleteMarker}
              data-key={place.id}
              data-place={place.place}
              data-lat={place.lat}
              data-lng={place.lng}>
              <FontAwesomeIcon icon="trash-alt" />
            </span>
          </td>
        </tr>
      );
    });
  };

  searchPlace = event => {
    this.setState({
      searchPlace: event.currentTarget.value,
    });
  };

  cancelEdit = event => {
    this.setState({
      editMarkerKey: null,
      searchPlace: '',
    });
  };

  renderHeader() {
    return (
      <tr>
        <th style={{ width: '30%' }}>Place</th>
        <th style={{ width: '30%' }}>Latitude</th>
        <th style={{ width: '30%' }}>Longitude</th>
        <th style={{ width: '10%' }}>Action</th>
      </tr>
    );
  }

  render() {
    const { searchPlace, editMarkerKey } = this.state;
    const { loading } = this.props;
    return (
      <div className="row">
        <div className="row text-center">
          <span className="text-right column-6">
            <input
              type="text"
              onChange={this.searchPlace}
              placeholder="Search Place"
              value={searchPlace}
            />
          </span>
          <span className="column-6 text-left">
            <button
              onClick={this.addAddress}
              className="btn btn-primary"
              disabled={searchPlace.trim().length === 0}>
              {!editMarkerKey ? 'Add Place' : 'Edit Place'}
            </button>
          </span>
        </div>
        <div className="all-places">
          <table className="search-table">
            <thead>{this.renderHeader()}</thead>
            {!loading ? (
              <tbody>{this.renderAllSearchPlaces()}</tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}
