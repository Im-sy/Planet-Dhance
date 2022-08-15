import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {jwtToken} from './components/API/AuthService';
import jwt_decode from 'jwt-decode';
import reportWebVitals from './reportWebVitals';
import AppRouter from './pages/AppRouter';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import AuthHeader from './components/API/AuthHeader';
import { setCurrentUserAction } from './reducer/authAction';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
if (localStorage.jwtToken) {
  AuthHeader(localStorage.jwtToken);
  const token = jwt_decode<jwtToken>(localStorage.jwtToken)
  store.dispatch(setCurrentUserAction(token.details))
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
