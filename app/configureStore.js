import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';

const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunkMiddleware,
		routerMiddleware(browserHistory)
	),
	global.devToolsExtension ? global.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

  	return store;
};
