import React from 'react';
import ReactDOM from 'react-dom';
import '!style-loader!css-loader!./index.css';
import ConnectionProvider from './containers/ConnectionProvider';
import TextInput from './containers/TextInput';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './containers/App';
import Messages from './containers/Messages';
const store = configureStore();

const Index = () => (
  <Provider store={store}>
    <ConnectionProvider>
      <App>
        <div className="root">
          <header className="app-bar">
            <h1>Kodify Chat</h1>
          </header>
          <Messages />
          <TextInput />
        </div>
      </App>
    </ConnectionProvider>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
