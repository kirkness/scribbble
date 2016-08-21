
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';
import HomePage from './components/HomePage';
import CodeDisplay from './components/CodeDisplay';

import './sass/main.scss';

class AppRouter extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={HomePage}>
                        <Route path="/code" component={CodeDisplay} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}


ReactDOM.render(<AppRouter />, document.getElementById('app'));
