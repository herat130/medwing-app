var routes = require('express').Router();
var axios = require('axios');
const uuidv1 = require('uuid/v1');

var markers = [{id:'1212',place:'berlin',lat:20.1212,lng:21.0020}];
var GEOLOCATION_API = 'https://maps.googleapis.com/maps/api/geocode/json?';

routes.get('/test', (req, rsp) => {
  rsp.send({ "test": true });
})

function duplicate(data) {
  var searchPlace = data.address_components[0].long_name;
  var searchLat = data.geometry.location.lat;
  var searchLng = data.geometry.location.lng;
  return markers.some(({ place, lat, lng }) => place === searchPlace && lat === searchLat && lng === searchLng);
}

function idExists(id) {
  return markers.some(marker => marker.id === id);
}

function fetchLocationDetails(address, id = null) {

  var url = `${GEOLOCATION_API}address=${address}&key=${
    process.env.REACT_APP_GOOGLE_API_KEY
    }`;
  return axios.get(url).then(v => {
    var status = v.data.status;
    if (status === 'OK') {
      if (!duplicate(v.data.results[0])) {
        var searchPlace = v.data.results[0].address_components[0].long_name;
        var searchLat = v.data.results[0].geometry.location.lat;
        var searchLng = v.data.results[0].geometry.location.lng;
        if (id) {
          markers = markers.map(marker => {
            if (marker.id === id) {
              return {
                ...marker,
                place: searchPlace,
                lat: searchLat,
                lng: searchLng
              };
            }
            return marker;
          })
        } else {
          markers = [{
            id: uuidv1(),
            place: searchPlace,
            lat: searchLat,
            lng: searchLng,
          }, ...markers]
        }
        return { data: markers, status: 'SUCCESS' };
      } else {
        return { data: markers, status: 'DUPLICATE' };
      }
    } else {
      return { data: markers, status: 'SERVER_ERROR', gApiStatus: status };
    }
  }).catch(err => { /** in case promise fail */
    return { data: markers, status: 'SERVER_ERROR' };
  });
}

routes.get('/fetch', (req, resp) => {
  try {
    resp.send({ data: markers, status: 'SUCCESS' });
  } catch (err) {
    resp.status(500).send({ status: 'SERVER_ERROR' });
  }
})

routes.post('/add', (req, resp) => {
  try {
    var address = req.body.address;
    fetchLocationDetails(address)
      .then(result => {
        resp.send(result);
      })
      .catch(err => {
        resp.status(500).send(result);
      });
  } catch (err) {
    resp.status(500).send({ status: 'SERVER_ERROR' });
  }
});

routes.delete('/delete', (req, resp) => {
  try {
    var id = req.body.id;
    if (!idExists(id)) {
      resp.send({ data: markers, status: 'ID_NOT_FOUND' });
    } else {
      markers = markers.filter(marker => marker.id !== id);
      resp.send({ data: markers, status: 'SUCCESS' });
    }
  } catch (err) {
    resp.status(500).send({ status: 'SERVER_ERROR' });
  }
});

routes.put('/update', (req, resp) => {
  try {
    var address = req.body.address;
    var id = req.body.id;
    if (!idExists(id)) {
      resp.send({ data: markers, status: 'ID_NOT_FOUND' });
    } else {
      fetchLocationDetails(address, id)
        .then(result => {
          resp.send(result);
        })
        .catch(err => {
          resp.status(500).send({ status: 'SERVER_ERROR' });
        });
    }
  } catch (err) {
    resp.status(500).send({ status: 'SERVER_ERROR' });
  }
});

module.exports = routes;