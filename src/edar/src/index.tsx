import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './stores/rootReducer';

// ブラウザの戻るボタンを押したときはリロードを実施
window.history.replaceState(null, document.getElementsByTagName('title')[0].innerHTML, null);
window.addEventListener('popstate', function (e) {
  window.location.reload();
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          <App />
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
