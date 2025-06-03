counterSlice.js+

import { createSlice } from '@reduxjs/toolkit';

// Initial state of the counter
const initialState = {
  value: 0,
};

// Create a slice of the store
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Export actions to use in components
export const { increment, decrement } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;
store.js
Now create store.js in the src/redux folder to configure the Redux store.


import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// Configure the store and include the counter reducer
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
4. Wrap the App with Redux Provider
In src/index.js, wrap the entire app with the Provider from react-redux and pass the store as a prop:

js
Copy code
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
5. Create the Counter Component
In App.js, create the counter component with increment and decrement buttons.

js
Copy code
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/counterSlice';

function App() {
  // Get the current count value from the Redux store
  const count = useSelector((state) => state.counter.value);

  // Get the dispatch function to send actions to the store
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Simple Counter App</h1>
      <h2>{count}</h2>

      <button onClick={() => dispatch(increment())} style={{ marginRight: '10px' }}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
}

export default App;