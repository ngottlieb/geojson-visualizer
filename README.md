# GeoJSON-Visualizer

This is an opinionated tool for rapidly visualizing and sharing geospatial data. It's a work in progress;
feel free to make contributions or feature requests.

The goal is to build a tool that allows users to view data without having to open up ArcGIS, QGIS, etc.,
and to be able to share the maps they generate with others easily.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create pull request

Contributions are also welcome in the form of feature requests and ideas. Use the Github issue interface!

## Development

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * app dependencies: `npm install`
* Run:
    * `npm start` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `npm run build` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.

The app is written with React and LeafletJS.
