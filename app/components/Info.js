import React from "react";
import {Alert, ListGroup, ListGroupItem, Label, Badge} from "react-bootstrap";

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geometryTypeCounts: this.getGeometryTypeCounts(this.props.geoJSON),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.geoJSON !== prevProps.geoJSON) {
      this.setState({
        geometryTypeCounts: this.getGeometryTypeCounts(this.props.geoJSON),
      });
    }
  }

  getGeometryTypeCounts(geoJSON) {
    const geometryTypeCounts = {};
    if (geoJSON) {
      for (var feature of geoJSON.features) {
        geometryTypeCounts[feature.geometry.type] =
          ++geometryTypeCounts[feature.geometry.type] || 0;
      }
    }
    return geometryTypeCounts;
  }

  handlePropClick(name) {
    // turn prop colouring off if this prop is already active
    if (this.props.colourByProperty === name) {
      this.props.updateColourByProperty(null);
    } else {
      this.props.updateColourByProperty(name);
    }
  }

  render() {
    const propsList = this.props.propList.map(name => (
      <ListGroupItem
        className={this.props.colourByProperty === name ? 'active' : ''}
        key={name}
        onClick={() => this.handlePropClick(name)}
      >
        {name}
      </ListGroupItem>
    ));
    const geometryTypeCountsList = Object.keys(
      this.state.geometryTypeCounts,
    ).map(type => (
      <ListGroupItem key={type}>
        {type} <Label>{this.state.geometryTypeCounts[type]}</Label>
      </ListGroupItem>
    ));
    return (
      <React.Fragment>
        <h2>
          Filename
          <Label>{this.props.geoJSON ? this.props.geoJSON.fileName : ""}</Label>
        </h2>
        <h2>
          Features
          <Label>
            {this.props.geoJSON ? this.props.geoJSON.features.length : 0}
          </Label>
        </h2>
        <ListGroup>{geometryTypeCountsList}</ListGroup>
        <hr />
        <h2>
          Properties<Label>{this.props.propList.length}</Label>
        </h2>
        <Alert bsStyle="info">
          Click on a property name to colour features by that property.
        </Alert>
        <ListGroup>{propsList}</ListGroup>
      </React.Fragment>
    );
  }
}
