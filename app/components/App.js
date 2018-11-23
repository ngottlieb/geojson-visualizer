import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import MainMap from './MainMap';
import InputBox from './InputBox';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoJSON: ''
    };

    this.updateDataUrl = this.updateDataUrl.bind(this);
  }

  updateDataUrl(newUrl) {
    const self = this;
    fetch(newUrl).then(function(response) { return response.json(); })
      .then(function(j) { self.setState({ geoJSON: j }); });
  }

  render() {
    return (
      <div id='app'>
        <MainMap
          geoJSON={this.state.geoJSON}
        />
        <InputBox
          updateDataUrl={this.updateDataUrl}
        />
      </div>
    );
  }
}
