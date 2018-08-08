import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';

// reducers
import reducers from './reducers';

// middlewares
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

// components
import App from './components/App/App';

// styles
import './style/style.scss';


const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, apiMiddleware),
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.querySelector('.root'));

export default store;