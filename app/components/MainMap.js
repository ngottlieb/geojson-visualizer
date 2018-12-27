import React from "react";
import {render} from "react-dom";
import {GeoJSON, Map, TileLayer, Pane, Popup} from "react-leaflet";
import DataForm from "./DataForm";
import bbox from "@turf/bbox";
import queryString from 'query-string';

export default class MainMap extends React.Component {
  constructor(props) {
    super(props);

    const params = queryString.parse(location.search, { arrayFormat: 'bracket' });
    const filters = params.filters ? JSON.parse(params.filters) : {};

    this.state = {
      latlng: [51, -0.09],
      zoom: 1,
      tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      colourByProperty: params.colourByProperty,
      continuousProps: params.continuousProps || [],
      filters: filters
    };

    this.mapRef = React.createRef();
    this.featureStyle = this.featureStyle.bind(this);
    this.updateColourByProperty = this.updateColourByProperty.bind(this);
    this.showFeature = this.showFeature.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.updateContinuousProps = this.updateContinuousProps.bind(this);
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

  updateFilters(newFilters) {
    this.setState({ filters: newFilters });
    this.props.triggerGeoJSONUpdate();
  }

  getPropList(geoJSON) {
    const filters = {};
    if (geoJSON) {
      for (var feature of geoJSON.features) {
        const propKeys = Object.keys(feature.properties);
        for (var p of propKeys) {
          filters[p] = "";
        }
      }
    }
    return Object.keys(filters);
  }

  updateContinuousProps(name) {
    const index = this.state.continuousProps.indexOf(name);
    var cps = this.state.continuousProps.slice(0);
    if (index !== -1) {
      cps.splice(index,1);
    } else {
      cps.push(name);
    }
    this.setState({
      continuousProps: cps
    });
  }


  featureStyle(feature) {
    var styles = {
      color: "rgb(51, 136, 255)",
      fillColor: "rgb(51, 136, 255)",
    };
    // check if colourByProperty is set
    if (this.state.colourByProperty) {
      const propColour = this.state.colourByProperty;
      if (feature.properties[propColour]) {
        const colour = stringToColour(feature.properties[propColour]);
        styles.fillColor = colour;
        styles.color = colour;
      }
    }
    return styles;
  }

  popupText(properties) {
    var popupText = "<dl>";
    for (const key of Object.keys(properties)) {
      popupText += "<dt>" + key + "</dt>";
      popupText += "<dd>" + properties[key] + "</dd>";
    }
    popupText += "</dl>";
    return popupText;
  }

  updateColourByProperty(property) {
    this.setState({
      colourByProperty: property,
    });
  }

  showFeature(feature, layer) {
    for (const filter of Object.keys(this.state.filters)) {
      if (!('' + feature.properties[filter]).includes(this.state.filters[filter])) {
        return false;
      }
    }
    return true;
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
          style={this.featureStyle}
          filter={this.showFeature}
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
          updateColourByProperty={this.updateColourByProperty}
          colourByProperty={this.state.colourByProperty}
          filters={this.state.filters}
          propList={this.getPropList(this.props.geoJSON)}
          continuousProps={this.state.continuousProps}
          updateFilters={this.updateFilters}
          updateContinuousProps={this.updateContinuousProps}
        />
      </React.Fragment>
    );
  }
}

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
var stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};
