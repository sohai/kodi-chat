import React from 'react';
import ReactDOM from 'react-dom';
import '!style-loader!css-loader!./index.css';
import ConnectionProvider from './containers/ConnectionProvider';
import TextInputComponent from './components/TextInput';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './containers/App';
const store = configureStore();

const Index = () => (
  <Provider store={store}>
    <ConnectionProvider>
      <App>
        <div className="root">
          <header className="app-bar">
            <h1>Kodify Chat</h1>
          </header>
          <div className="content">
            <div className="message outgoing">Messages</div>
            <div className="message incoming">Messages1</div>
            <div className="message outgoing">Messages2ge </div>
          </div>
          <TextInputComponent />
        </div>
      </App>
    </ConnectionProvider>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
