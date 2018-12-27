import React from "react";
import {
  Checkbox,
  Alert,
  ListGroup,
  ListGroupItem,
  Label,
  Badge,
} from "react-bootstrap";

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

  handleContinuousClick(name) {
    this.props.updateContinuousProps(name);
  }

  propIsContinuous(name) {
    return (
      this.props.continuousProps &&
      this.props.continuousProps.indexOf(name) !== -1
    );
  }

  render() {
    const propsList = this.props.propList.map(name => (
      <ListGroupItem
        className={this.props.colourByProperty === name ? "active" : ""}
        key={name}>
        <span onClick={() => this.handlePropClick(name)}>{name}</span>
        <Checkbox
          className="pull-right"
          inline
          onChange={() => this.handleContinuousClick(name)}
          checked={this.propIsContinuous(name)}
        >
          Continuous
        </Checkbox>
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
          Properties are assumed to be discrete by default; check the box on the
          right to mark them as continuous variables. It is assumed that continuous
          variables are numeric.
        </Alert>
        <ListGroup>{propsList}</ListGroup>
      </React.Fragment>
    );
  }
}
