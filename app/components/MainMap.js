import React from 'react';
import { render } from 'react-dom';
import { GeoJSON, Map, TileLayer, Pane, Popup } from 'react-leaflet';
import DataForm from './DataForm';
import bbox from '@turf/bbox';

export default class MainMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latlng: [51, -0.09],
      zoom: 1,
      tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    };
    this.mapRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // use turf to calculate bounding box of GeoJSON
    // and fit map to bounds
    // because we re-render the map whenever the GeoJSON changes, we can't
    // use an "onAdd" callback on the GeoJSON component because the map
    // hasn't been rendered to the DOM when we're adding the GeoJSON
    if (this.props.geoJSON && this.props.geoJSON !== prevProps.geoJSON) {
      const bounds = bbox(this.props.geoJSON);
      const leafletBounds = [[bounds[1], bounds[0]], [bounds[3], bounds[2]]];
      this.mapRef.current.leafletElement.fitBounds(leafletBounds);
    }
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
        <Map center={position} zoom={zoom} id="mapid" ref={this.mapRef}>
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
