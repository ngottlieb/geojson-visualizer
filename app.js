!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},r={},a={},o={}.hasOwnProperty,n=/^\.\.?(\/|$)/,l=function(e,t){for(var r,a=[],o=(n.test(t)?e+"/"+t:t).split("/"),l=0,i=o.length;l<i;l++)r=o[l],".."===r?a.pop():"."!==r&&""!==r&&a.push(r);return a.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(r){var a=l(i(t),r);return e.require(a,t)}},s=function(e,t){var a=m&&m.createHot(e),o={id:e,exports:{},hot:a};return r[e]=o,t(o.exports,u(e),o),o.exports},p=function(e){return a[e]?p(a[e]):e},c=function(e,t){return p(l(i(e),t))},f=function(e,a){null==a&&(a="/");var n=p(e);if(o.call(r,n))return r[n].exports;if(o.call(t,n))return s(n,t[n]);throw new Error("Cannot find module '"+e+"' from '"+a+"'")};f.alias=function(e,t){a[t]=e};var d=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,y=function(e){if(d.test(e)){var t=e.replace(d,"");o.call(a,t)&&a[t].replace(d,"")!==t+"/index"||(a[t]=e)}if(h.test(e)){var r=e.replace(h,"");o.call(a,r)||(a[r]=e)}};f.register=f.define=function(e,a){if(e&&"object"==typeof e)for(var n in e)o.call(e,n)&&f.register(n,e[n]);else t[e]=a,delete r[e],y(e)},f.list=function(){var e=[];for(var r in t)o.call(t,r)&&e.push(r);return e};var m=e._hmr&&new e._hmr(c,f,t,r);f._cache=r,f.hmr=m&&m.wrap,f.brunch=!0,e.require=f}}(),function(){var e;"undefined"==typeof window?this:window;require.register("components/App.js",function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=t("react"),s=a(u),p=t("react-bootstrap"),c=t("./MainMap"),f=a(c),d=t("./DataForm"),h=(a(d),t("query-string")),y=a(h),m=function(e){function t(e){o(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));r.state={geoJSON:"",dataUrlChangeKey:0,showModal:!1,dataUrl:""},r.updateDataUrl=r.updateDataUrl.bind(r),r.openModal=r.openModal.bind(r),r.loadExampleData=r.loadExampleData.bind(r),r.triggerGeoJSONUpdate=r.triggerGeoJSONUpdate.bind(r);var a=y["default"].parse(location.search);return a.dataUrl&&r.updateDataUrl(a.dataUrl),r}return l(t,e),i(t,[{key:"triggerGeoJSONUpdate",value:function(){this.setState({dataUrlChangeKey:this.state.dataUrlChangeKey+1})}},{key:"updateDataUrl",value:function(e){var t=this;fetch(e).then(function(e){return e.json()}).then(function(r){t.setState({geoJSON:r,dataUrl:e,dataUrlChangeKey:t.state.dataUrlChangeKey+1})})}},{key:"openModal",value:function(){this.setState({showModal:!0})}},{key:"loadExampleData",value:function(){this.setState({dataUrl:"https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/500k/2017/american-indian-area!alaska-native-area!hawaiian-home-land.json",showModal:!1})}},{key:"render",value:function(){var e=this;return s["default"].createElement("div",{id:"app"},s["default"].createElement(f["default"],{geoJSON:this.state.geoJSON,dataChangeKey:this.state.dataUrlChangeKey,updateDataUrl:this.updateDataUrl,dataUrl:this.state.dataUrl,openModal:this.openModal,triggerGeoJSONUpdate:this.triggerGeoJSONUpdate}),s["default"].createElement(p.Modal,{show:this.state.showModal,onHide:function(){return e.setState({showModal:!1})}},s["default"].createElement(p.Modal.Header,{closeButton:!0},s["default"].createElement(p.Modal.Title,null,"What is this?")),s["default"].createElement(p.Modal.Body,null,s["default"].createElement("p",null,"This is a GeoJSON visualization tool designed to allow users to quickly and easily view geospatial data. It's an alternative to opening up a GIS client like Arc or QGIS. It analyzes the GeoJSON data and makes some guesses about the type of data in properties and uses those to enable filtering data."),s["default"].createElement("h4",null,"How do I use it?"),s["default"].createElement("p",null,'Right now, you have to provide a URL to a GeoJSON file and click "Load Data."'),s["default"].createElement("h4",null,"Enough talk, let's see an example"),s["default"].createElement("p",null,"The example data are from ",s["default"].createElement("a",{href:"https://github.com/loganpowell/census-geojson"},"https://github.com/loganpowell/census-geojson"),"."),s["default"].createElement(p.Button,{onClick:this.loadExampleData,bsStyle:"info"},"Load Example GeoJSON"),s["default"].createElement("h4",null,"Bugs, Feature Requests, Contributions?"),s["default"].createElement("p",null,"Head to the Github repo: ",s["default"].createElement("a",{href:"https://github.com/ngottlieb/geojson-visualizer"},"https://github.com/ngottlieb/geojson-visualizer"),". Feel free to fork and submit pull requests, or use Github issues to submit bugs or feature requests."))))}}]),t}(s["default"].Component);e["default"]=m}),require.register("components/DataForm.js",function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),s=t("react"),p=a(s),c=(t("react-leaflet"),t("react-bootstrap")),f=t("./Info"),d=a(f),h=t("./Filters"),y=a(h),m=t("query-string"),b=a(m),g=t("react-copy-to-clipboard"),v=function(e){function t(e){n(this,t);var r=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={dataUrl:r.props.dataUrl,activeTabKey:r.props.geoJSON?2:1,shareMapUrl:r.getShareMapUrl(),copied:!1},r.handleChange=r.handleChange.bind(r),r.loadData=r.loadData.bind(r),r.setShortUrl=r.setShortUrl.bind(r),r}return i(t,e),u(t,[{key:"handleChange",value:function(e){this.setState(o({},e.target.name,e.target.value))}},{key:"componentDidUpdate",value:function(e){var t=this;this.props.dataUrl!==e.dataUrl&&this.setState({dataUrl:this.props.dataUrl},function(){t.loadData()}),this.props.dataUrl===e.dataUrl&&this.props.filters===e.filters&&this.props.colourByProperty===e.colourByProperty||this.setShareMapUrl()}},{key:"getShareMapUrl",value:function(){var e=location.origin+location.pathname+"?";return e+b["default"].stringify({colourByProperty:this.props.colourByProperty,filters:JSON.stringify(this.props.filters),dataUrl:this.props.dataUrl})}},{key:"setShareMapUrl",value:function(){var e=this.getShareMapUrl();this.setShortUrl(e),this.setState({shareMapUrl:e})}},{key:"setShortUrl",value:function(e){var t=this;console.log("running get short url"),fetch("https://cors-anywhere.herokuapp.com/http://tinyurl.com/api-create.php?url="+e).then(function(e){return e.text()}).then(function(e){t.setState({shortUrl:e,copied:!1})})}},{key:"loadData",value:function(){this.props.updateDataUrl(this.state.dataUrl),this.setState({activeTabKey:2})}},{key:"render",value:function(){var e=this;return p["default"].createElement(c.Well,{className:"form-box leaflet-top leaflet-control leaflet-right"},p["default"].createElement(c.Tabs,{activeKey:this.state.activeTabKey,id:"data-form-tabs",onSelect:function(t){e.setState({activeTabKey:t})}},p["default"].createElement(c.Tab,{eventKey:1,title:"Load Data"},p["default"].createElement(c.Form,null,p["default"].createElement(c.FormGroup,{controlId:"dataUrl"},p["default"].createElement(c.ControlLabel,null,"Data URL"),p["default"].createElement(c.FormControl,{type:"text",value:this.state.dataUrl,name:"dataUrl",placeholder:"Input GeoJSON URL",onChange:this.handleChange})),p["default"].createElement(c.Button,{bsStyle:"info",onClick:this.loadData},"Load Data"),p["default"].createElement(c.Button,{className:"pull-left",onClick:this.props.openModal,bsStyle:"danger"},"HELP!"))),p["default"].createElement(c.Tab,{eventKey:2,title:"Info",className:"info-tab"},p["default"].createElement(d["default"],{className:"info-tab",geoJSON:this.props.geoJSON,colourByProperty:this.props.colourByProperty,updateColourByProperty:this.props.updateColourByProperty,propList:this.props.propList})),p["default"].createElement(c.Tab,{eventKey:3,title:"Filter"},p["default"].createElement(y["default"],{className:"filters-tab",geoJSON:this.props.geoJSON,propList:this.props.propList,filters:this.props.filters,updateFilters:this.props.updateFilters})),p["default"].createElement(c.Tab,{eventKey:4,title:"Share Map"},p["default"].createElement("p",null,"Share this link to regenerate this map:",p["default"].createElement("br",null),p["default"].createElement("a",{href:this.state.shareMapUrl}," ",this.state.shareMapUrl)),p["default"].createElement("hr",null),p["default"].createElement(c.FormGroup,{controlId:"shortUrl"},p["default"].createElement(c.ControlLabel,null,"Shortened URL"),p["default"].createElement(c.FormControl,{type:"text",defaultValue:this.state.shortUrl,readOnly:!0})),p["default"].createElement(g.CopyToClipboard,{text:this.state.shortUrl,onCopy:function(){return e.setState({copied:!0})}},p["default"].createElement(c.Button,{onClick:this.copyToClipboard,bsStyle:this.state.copied?"danger":"info"},this.state.copied?"Copied":"Copy to Clipboard")))))}}]),t}(p["default"].Component);e["default"]=v}),require.register("components/Filters.js",function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=t("react"),s=a(u),p=t("react-bootstrap"),c=function(e){function t(e){o(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={},r.handleChange=r.handleChange.bind(r),r}return l(t,e),i(t,[{key:"handleChange",value:function(e){var t=Object.assign({},this.props.filters);t[e.target.name]=e.target.value,this.props.updateFilters(t)}},{key:"render",value:function(){var e=this,t=this.props.propList.map(function(t){return s["default"].createElement(p.FormGroup,{controlId:t,key:t},s["default"].createElement(p.ControlLabel,null,t),s["default"].createElement(p.FormControl,{type:"text",name:t,defaultValue:e.props.filters[t],placeholder:"Filter by "+t,onChange:e.handleChange}))});return s["default"].createElement(s["default"].Fragment,null,s["default"].createElement("h2",null,"Filter By Properties"),t)}}]),t}(s["default"].Component);e["default"]=c}),require.register("components/Info.js",function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=t("react"),s=a(u),p=t("react-bootstrap"),c=function(e){function t(e){o(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={geometryTypeCounts:r.getGeometryTypeCounts(r.props.geoJSON)},r}return l(t,e),i(t,[{key:"componentDidUpdate",value:function(e){this.props.geoJSON!==e.geoJSON&&this.setState({geometryTypeCounts:this.getGeometryTypeCounts(this.props.geoJSON)})}},{key:"getGeometryTypeCounts",value:function(e){var t={};if(e){var r=!0,a=!1,o=void 0;try{for(var n,l=e.features[Symbol.iterator]();!(r=(n=l.next()).done);r=!0){var i=n.value;t[i.geometry.type]=++t[i.geometry.type]||0}}catch(u){a=!0,o=u}finally{try{!r&&l["return"]&&l["return"]()}finally{if(a)throw o}}}return t}},{key:"handlePropClick",value:function(e){this.props.colourByProperty===e?this.props.updateColourByProperty(null):this.props.updateColourByProperty(e)}},{key:"render",value:function(){var e=this,t=this.props.propList.map(function(t){return s["default"].createElement(p.ListGroupItem,{className:e.props.colourByProperty===t?"active":"",key:t,onClick:function(){return e.handlePropClick(t)}},t)}),r=Object.keys(this.state.geometryTypeCounts).map(function(t){return s["default"].createElement(p.ListGroupItem,{key:t},t," ",s["default"].createElement(p.Label,null,e.state.geometryTypeCounts[t]))});return s["default"].createElement(s["default"].Fragment,null,s["default"].createElement("h2",null,"Filename",s["default"].createElement(p.Label,null,this.props.geoJSON?this.props.geoJSON.fileName:"")),s["default"].createElement("h2",null,"Features",s["default"].createElement(p.Label,null,this.props.geoJSON?this.props.geoJSON.features.length:0)),s["default"].createElement(p.ListGroup,null,r),s["default"].createElement("hr",null),s["default"].createElement("h2",null,"Properties",s["default"].createElement(p.Label,null,this.props.propList.length)),s["default"].createElement(p.Alert,{bsStyle:"info"},"Click on a property name to colour features by that property."),s["default"].createElement(p.ListGroup,null,t))}}]),t}(s["default"].Component);e["default"]=c}),require.register("components/MainMap.js",function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=t("react"),s=a(u),p=(t("react-dom"),t("react-leaflet")),c=t("./DataForm"),f=a(c),d=t("@turf/bbox"),h=a(d),y=t("query-string"),m=a(y),b=function(e){function t(e){o(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),a=m["default"].parse(location.search),l=a.filters?JSON.parse(a.filters):{};return r.state={latlng:[51,-.09],zoom:1,tileLayer:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",colourByProperty:a.colourByProperty,filters:l},r.mapRef=s["default"].createRef(),r.featureStyle=r.featureStyle.bind(r),r.updateColourByProperty=r.updateColourByProperty.bind(r),r.showFeature=r.showFeature.bind(r),r.updateFilters=r.updateFilters.bind(r),r}return l(t,e),i(t,[{key:"componentDidUpdate",value:function(e){if(this.props.geoJSON&&this.props.geoJSON!==e.geoJSON){var t=(0,h["default"])(this.props.geoJSON),r=[[t[1],t[0]],[t[3],t[2]]];this.mapRef.current.leafletElement.fitBounds(r)}}},{key:"onEachFeature",value:function(e,t){e.properties&&t.bindPopup(this.popupText(e.properties))}},{key:"updateFilters",value:function(e){this.setState({filters:e}),this.props.triggerGeoJSONUpdate()}},{key:"getPropList",value:function(e){var t={};if(e){var r=!0,a=!1,o=void 0;try{for(var n,l=e.features[Symbol.iterator]();!(r=(n=l.next()).done);r=!0){var i=n.value,u=Object.keys(i.properties),s=!0,p=!1,c=void 0;try{for(var f,d=u[Symbol.iterator]();!(s=(f=d.next()).done);s=!0){var h=f.value;t[h]=""}}catch(y){p=!0,c=y}finally{try{!s&&d["return"]&&d["return"]()}finally{if(p)throw c}}}}catch(y){a=!0,o=y}finally{try{!r&&l["return"]&&l["return"]()}finally{if(a)throw o}}}return Object.keys(t)}},{key:"featureStyle",value:function(e){var t={color:"rgb(51, 136, 255)",fillColor:"rgb(51, 136, 255)"};if(this.state.colourByProperty){var r=this.state.colourByProperty;if(e.properties[r]){var a=g(e.properties[r]);t.fillColor=a,t.color=a}}return t}},{key:"popupText",value:function r(e){var r="<dl>",t=!0,a=!1,o=void 0;try{for(var n,l=Object.keys(e)[Symbol.iterator]();!(t=(n=l.next()).done);t=!0){var i=n.value;r+="<dt>"+i+"</dt>",r+="<dd>"+e[i]+"</dd>"}}catch(u){a=!0,o=u}finally{try{!t&&l["return"]&&l["return"]()}finally{if(a)throw o}}return r+="</dl>"}},{key:"updateColourByProperty",value:function(e){this.setState({colourByProperty:e})}},{key:"showFeature",value:function(e,t){var r=!0,a=!1,o=void 0;try{for(var n,l=Object.keys(this.state.filters)[Symbol.iterator]();!(r=(n=l.next()).done);r=!0){var i=n.value;if(!(""+e.properties[i]).includes(this.state.filters[i]))return!1}}catch(u){a=!0,o=u}finally{try{!r&&l["return"]&&l["return"]()}finally{if(a)throw o}}return!0}},{key:"render",value:function(){var e,t=this.state.latlng,r=this.state.zoom;this.state.tileLayer;return this.props.geoJSON&&(e=s["default"].createElement(p.GeoJSON,{key:this.props.dataChangeKey,data:this.props.geoJSON,onEachFeature:this.onEachFeature.bind(this),style:this.featureStyle,filter:this.showFeature})),s["default"].createElement(s["default"].Fragment,null,s["default"].createElement(p.Map,{center:t,zoom:r,id:"mapid",ref:this.mapRef},s["default"].createElement(p.TileLayer,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:19}),e),s["default"].createElement(f["default"],{openModal:this.props.openModal,updateDataUrl:this.props.updateDataUrl,dataUrl:this.props.dataUrl,geoJSON:this.props.geoJSON,dataChangeKey:this.props.dataChangeKey,updateColourByProperty:this.updateColourByProperty,colourByProperty:this.state.colourByProperty,filters:this.state.filters,propList:this.getPropList(this.props.geoJSON),updateFilters:this.updateFilters}))}}]),t}(s["default"].Component);e["default"]=b;var g=function(e){for(var t=0,r=0;r<e.length;r++)t=e.charCodeAt(r)+((t<<5)-t);for(var a="#",r=0;r<3;r++){var o=t>>8*r&255;a+=("00"+o.toString(16)).substr(-2)}return a}}),require.register("initialize.js",function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var o=t("react-dom"),n=a(o),l=t("react"),i=a(l),u=t("components/App"),s=a(u);document.addEventListener("DOMContentLoaded",function(){n["default"].render(i["default"].createElement(s["default"],null),document.getElementById("container"))})}),require.alias("buffer/index.js","buffer"),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,t,r){})}(),require("___globals___");