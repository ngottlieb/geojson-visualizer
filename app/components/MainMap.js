import React from 'react';
import { render } from 'react-dom';
import { GeoJSON, Map, TileLayer, Pane } from 'react-leaflet';

export default class MainMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latlng: [51, -0.09],
      zoom: 1,
      tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    };
  }

  render() {
    const position = this.state.latlng;
    const zoom = this.state.zoom;
    const tileLayer = this.state.tileLayer;

    var geoJSON;
    if (this.props.geoJSON) {
      geoJSON = (
        <GeoJSON
          data={this.props.geoJSON}
        />
      );
    } 

    return (
      <Map center={position} zoom={zoom} id="mapid">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={19}
        />
        {geoJSON}
      </Map>
    );
  }
}
