import React from "react";
import {MapControl} from "react-leaflet";
import {
  Well,
  Form,
  FormGroup,
  FormControl,
  Checkbox,
  ControlLabel,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import Info from "./Info";
import Filters from "./Filters";
import queryString from "query-string";
import {CopyToClipboard} from "react-copy-to-clipboard";

export default class DataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUrl: this.props.dataUrl,
      activeTabKey: this.props.geoJSON ? 2 : 1,
      shareMapUrl: this.getShareMapUrl(),
      copied: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.loadData = this.loadData.bind(this);
    this.setShortUrl = this.setShortUrl.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataUrl !== prevProps.dataUrl) {
      this.setState({dataUrl: this.props.dataUrl}, () => {
        this.loadData();
      });
    }

    if (
      this.props.dataUrl !== prevProps.dataUrl ||
      this.props.filters !== prevProps.filters ||
      this.props.colourByProperty !== prevProps.colourByProperty ||
      // this is funky, trying to determine if the arrays have the same values
      difference(this.props.continuousProps, prevProps.continuousProps).length !== 0
    ) {
      this.setShareMapUrl();
    }
  }

  getShareMapUrl() {
    const urlBase = location.origin + location.pathname + "?";
    return (
      urlBase +
      queryString.stringify({
        colourByProperty: this.props.colourByProperty,
        filters: JSON.stringify(this.props.filters),
        dataUrl: this.props.dataUrl,
        continuousProps: this.props.continuousProps,
      }, {
          arrayFormat: 'bracket'
      })
    );
  }

  setShareMapUrl() {
    const url = this.getShareMapUrl();

    this.setShortUrl(url);
    this.setState({shareMapUrl: url});
  }

  setShortUrl(url) {
    const self = this;
    console.log("running get short url");
    fetch(
      "https://cors-anywhere.herokuapp.com/http://tinyurl.com/api-create.php?url=" +
        url,
    )
      .then(function(response) {
        return response.text();
      })
      .then(function(txt) {
        self.setState({shortUrl: txt, copied: false});
      });
  }

  loadData() {
    this.props.updateDataUrl(this.state.dataUrl);
    this.setState({activeTabKey: 2});
  }

  render() {
    return (
      <Well className="form-box leaflet-top leaflet-control leaflet-right">
        <Tabs
          activeKey={this.state.activeTabKey}
          id="data-form-tabs"
          onSelect={key => {
            this.setState({activeTabKey: key});
          }}>
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
              <Button bsStyle="info" onClick={this.loadData}>
                Load Data
              </Button>
              <Button
                className="pull-left"
                onClick={this.props.openModal}
                bsStyle="danger">
                HELP!
              </Button>
            </Form>
          </Tab>
          <Tab eventKey={2} title="Info" className="info-tab">
            <Info
              className="info-tab"
              geoJSON={this.props.geoJSON}
              colourByProperty={this.props.colourByProperty}
              updateColourByProperty={this.props.updateColourByProperty}
              updateContinuousProps={this.props.updateContinuousProps}
              continuousProps={this.props.continuousProps}
              propList={this.props.propList}
            />
          </Tab>
          <Tab eventKey={3} title="Filter">
            <Filters
              className="filters-tab"
              geoJSON={this.props.geoJSON}
              propList={this.props.propList}
              filters={this.props.filters}
              updateFilters={this.props.updateFilters}
            />
          </Tab>
          <Tab eventKey={4} title="Share Map">
            <p>
              Share this link to regenerate this map:
              <br />
              <a href={this.state.shareMapUrl}> {this.state.shareMapUrl}</a>
            </p>
            <hr />
            <FormGroup controlId="shortUrl">
              <ControlLabel>Shortened URL</ControlLabel>
              <FormControl
                type="text"
                defaultValue={this.state.shortUrl}
                readOnly
              />
            </FormGroup>
            <CopyToClipboard
              text={this.state.shortUrl}
              onCopy={() => this.setState({copied: true})}>
              <Button
                onClick={this.copyToClipboard}
                bsStyle={this.state.copied ? "danger" : "info"}>
                {this.state.copied ? "Copied" : "Copy to Clipboard"}
              </Button>
            </CopyToClipboard>
          </Tab>
        </Tabs>
      </Well>
    );
  }
}

// adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
const difference = (a, b) => {
  var _difference = new Set(a);
  const setB = new Set(b);
  for (var elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  }
  return [..._difference];
}
