import React from "react";
import {Button, Modal} from "react-bootstrap";
import MainMap from "./MainMap";
import DataForm from "./DataForm";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoJSON: "",
      dataUrlChangeKey: 0,
      showModal: false,
      dataUrl: "",
    };

    this.updateDataUrl = this.updateDataUrl.bind(this);
    this.openModal = this.openModal.bind(this);
    this.loadExampleData = this.loadExampleData.bind(this);
  }


  updateDataUrl(newUrl) {
    const self = this;
    fetch(newUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(j) {
        self.setState({
          geoJSON: j,
          dataUrl: newUrl,
          dataUrlChangeKey: self.state.dataUrlChangeKey + 1,
        });
      });
  }

  openModal() {
    this.setState({showModal: true});
  }

  loadExampleData() {
    this.setState({
      dataUrl:
        "https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/500k/2017/american-indian-area!alaska-native-area!hawaiian-home-land.json",
      showModal: false
    });
  }

  render() {
    return (
      <div id="app">
        <MainMap
          geoJSON={this.state.geoJSON}
          dataChangeKey={this.state.dataUrlChangeKey}
          updateDataUrl={this.updateDataUrl}
          dataUrl={this.state.dataUrl}
          openModal={this.openModal}
        />
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({showModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>What is this?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              This is a GeoJSON visualization tool designed to allow users to
              quickly and easily view geospatial data. It's an alternative to
              opening up a GIS client like Arc or QGIS. It analyzes the GeoJSON
              data and makes some guesses about the type of data in properties
              and uses those to enable filtering data.
            </p>
            <h4>How do I use it?</h4>
            <p>
              Right now, you have to provide a URL to a GeoJSON file and click
              "Load Data."
            </p>
            <h4>Enough talk, let's see an example</h4>
            <p>
              The example data are from <a href="https://github.com/loganpowell/census-geojson">https://github.com/loganpowell/census-geojson</a>.
            </p>
            <Button onClick={this.loadExampleData} bsStyle="info">
              Load Example GeoJSON
            </Button>
            <h4>Bugs, Feature Requests, Contributions?</h4>
            <p>
              Head to the Github repo: <a href="https://github.com/ngottlieb/geojson-visualizer">https://github.com/ngottlieb/geojson-visualizer</a>.
              Feel free to fork and submit pull requests, or use Github issues to submit bugs or feature requests.
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
