import React from 'react';
import { MapControl } from 'react-leaflet';
import { Well, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Tabs, Tab } from 'react-bootstrap';
import Info from './Info';
import Filters from './Filters';

export default class DataForm extends React.Component {
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
      <Well className='form-box leaflet-top leaflet-control leaflet-right'>
        <Tabs defaultActiveKey={1} id="data-form-tabs">
          <Tab eventKey={1} title="Load Data">
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
          </Tab>
          <Tab eventKey={2} title="Info" className="info-tab">
            <Info
              className="info-tab"
              geoJSON={this.props.geoJSON}
            />
          </Tab>
          <Tab eventKey={3} title="Filter">
            <Filters
              geoJSON={this.props.geoJSON}
            />
          </Tab>
        </Tabs>
      </Well>
    );
  }
}
