//dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from "react-redux"

//styling
import './index.css';
import 'antd/dist/antd.css';

//components
import App from './App';
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
                <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);


