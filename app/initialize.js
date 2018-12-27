import ReactDOM from 'react-dom';
import React from 'react';
import App from 'components/App';
import ReactGA from 'react-ga';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('container'));
  ReactGA.initialize('UA-128189503-3');
  ReactGA.pageview(window.location.pathname + window.location.search);
});
