import React from 'react';
import { render } from 'react-dom';
import { GeoJSON, Map, TileLayer, Pane, Popup } from 'react-leaflet';
import DataForm from './DataForm';

export default class MainMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latlng: [51, -0.09],
      zoom: 1,
      tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    };
  }

  onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(this.popupText(feature.properties));
    }
  }

  popupText(properties) {
    var popupText = '<dl>';
    for (const key of Object.keys(properties)) {
      popupText += "<dt>" + key + "</dt>";
      popupText += "<dd>" + properties[key] + "</dd>";
    }
    popupText += "</dl>";
    return popupText;
  }

  render() {
    const position = this.state.latlng;
    const zoom = this.state.zoom;
    const tileLayer = this.state.tileLayer;

    var geoJSON;
    if (this.props.geoJSON) {
      geoJSON = (
        <GeoJSON
          key={this.props.dataChangeKey}
          data={this.props.geoJSON}
          onEachFeature={this.onEachFeature.bind(this)}
        />
      );
    } 

    return (
      <React.Fragment>
        <Map center={position} zoom={zoom} id="mapid">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom={19}
          />
          {geoJSON}
        </Map>
        <DataForm
          openModal={this.props.openModal}
          updateDataUrl={this.props.updateDataUrl}
          dataUrl={this.props.dataUrl}
          geoJSON={this.props.geoJSON}
          dataChangeKey={this.props.dataChangeKey}
        />
      </React.Fragment>
    );
  }
}
