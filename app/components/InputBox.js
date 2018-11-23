import React from 'react';
import { MapControl } from 'react-leaflet';
import { Well, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';

export default class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUrl: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loadData() {
    this.props.updateDataUrl(this.state.dataUrl);
  }

  render() {
    return (
      <Well className='input-box leaflet-top leaflet-control leaflet-right'>
        <Form>
          <FormGroup controlId="dataUrl">
            <ControlLabel>Data URL</ControlLabel>
            <FormControl
              type="text"
              value={this.state.dataUrl}
              name="dataUrl"
              placeholder="Input GeoJSON URL"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            bsStyle="info"
            onClick={this.loadData}>Load Data</Button>
        </Form>
      </Well>
    );
  }
}
