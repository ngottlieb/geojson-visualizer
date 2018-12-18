import React from 'react';
import { ListGroup, ListGroupItem, Label, Badge } from 'react-bootstrap';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propList: this.getPropList(this.props.geoJSON),
      geometryTypeCounts: this.getGeometryTypeCounts(this.props.geoJSON)
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.geoJSON !== prevProps.geoJSON) {
      this.setState({
        propList: this.getPropList(this.props.geoJSON),
        geometryTypeCounts: this.getGeometryTypeCounts(this.props.geoJSON)
      });
    }
  }

  getGeometryTypeCounts(geoJSON) {
    const geometryTypeCounts = {};
    if (geoJSON) {
      for (var feature of geoJSON.features) {
        geometryTypeCounts[feature.geometry.type] = ++geometryTypeCounts[feature.geometry.type] || 0;
      }
    }
    return geometryTypeCounts;
  }

  getPropList(geoJSON) {
    const filters = {};
    if (geoJSON) {
      for (var feature of geoJSON.features) {
        const propKeys = Object.keys(feature.properties);
        for (var p of propKeys) {
          filters[p] = '';
        }
      }
    }
    return Object.keys(filters);
  }

  render() {
    const propsList = this.state.propList.map((name) => (
      <ListGroupItem key={name}>{name}</ListGroupItem>
    ));
    const geometryTypeCountsList = Object.keys(this.state.geometryTypeCounts).map((type) => (
      <ListGroupItem key={type}>{type} <Label>{this.state.geometryTypeCounts[type]}</Label></ListGroupItem>
    ));
    return (
      <React.Fragment>
        <h2>Features<Label>{this.props.geoJSON ? this.props.geoJSON.features.length : 0}</Label></h2>
        <ListGroup>
          {geometryTypeCountsList}
        </ListGroup>
        <hr />
        <h2>Properties<Label>{this.state.propList.length}</Label></h2>
        <ListGroup>
          {propsList}
        </ListGroup>
      </React.Fragment>
    );
  }
}
