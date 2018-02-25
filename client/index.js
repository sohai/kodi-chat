import React from 'react';
import ReactDOM from 'react-dom';
import '!style-loader!css-loader!./index.css';
import ConnectionProvider from './containers/ConnectionProvider';
import TextInputComponent from './components/TextInput';
import Overlay from './components/Overlay';
import Typography from './components/Typography';
import configureStore from './store';
import { Provider } from 'react-redux';
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectionProvider>
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
        <Overlay>
          <Typography variant="display1" color="light">
            Loading...
          </Typography>
        </Overlay>
      </div>
    </ConnectionProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
