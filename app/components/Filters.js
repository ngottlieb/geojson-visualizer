import React from "react";
import {Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var newFilters = Object.assign({}, this.props.filters);
    newFilters[e.target.name] = e.target.value;
    this.props.updateFilters(newFilters);
  }

  render() {
    const propsFilters = this.props.propList.map(name => (
      <FormGroup controlId={name} key={name}>
        <ControlLabel>{name}</ControlLabel>
        <FormControl
          type="text"
          name={name}
          placeholder={`Filter by ${name}`}
          onChange={this.handleChange}
        />
      </FormGroup>
    ));
    return (
      <React.Fragment>
        <h2>Filter By Properties</h2>
        {propsFilters}
      </React.Fragment>
    );
  }
}
