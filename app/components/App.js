import React from 'react';
import { Button } from 'react-bootstrap';
import MainMap from './MainMap';
import DataForm from './DataForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoJSON: '',
      dataUrlChangeKey: 0
    };

    this.updateDataUrl = this.updateDataUrl.bind(this);
  }

  updateDataUrl(newUrl) {
    const self = this;
    fetch(newUrl).then(function(response) { return response.json(); })
      .then(function(j) {
        self.setState({ 
          geoJSON: j,
          dataUrlChangeKey: self.state.dataUrlChangeKey + 1
        });
      });
  }

  render() {
    return (
      <div id='app'>
        <MainMap
          geoJSON={this.state.geoJSON}
          dataChangeKey={this.state.dataUrlChangeKey}
          updateDataUrl={this.updateDataUrl}
        />
      </div>
    );
  }
}
