// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import UserList from './components/UserList';

ReactDOM.render(
  <Provider store={store}>
    <UserList />
  </Provider>,
  document.getElementById('root')
);
