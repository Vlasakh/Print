import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from '../react/containers/App.jsx';
import configureStore from '../react/stores/configureStore';

console.clear();

const store = configureStore();

// ReactDOM.render(<App/>, document.getElementById('root'));
render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('root')
);
