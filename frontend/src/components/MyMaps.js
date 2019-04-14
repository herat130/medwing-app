import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { MAP_INITIAL_LOCATION } from '../utils/constant';

/**
 * Display map and related markers
 */
export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  remderMarkers() {
    const { allPlaces } = this.props;
    return (allPlaces || []).map(place => {
      return (
        <Marker
          key={place.id}
          title={place.place}
          name={place.place}
          onClick={this.onMarkerClick}
          position={{ lat: place.lat, lng: place.lng }}
        />
      );
    });
  }

  render() {
    const { zoom } = this.props;
    const { selectedPlace, activeMarker, showingInfoWindow } = {
      ...this.state,
    };
    return (
      <Map
        google={this.props.google}
        style={{
          position: 'absolute',
          width: '93%',
          height: '500px',
        }}
        initialCenter={MAP_INITIAL_LOCATION}
        zoom={zoom}>
        {this.remderMarkers()}
        <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
          <div>
            <h1>{selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

MapContainer.defaultProps = {
  zoom: 5,
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
