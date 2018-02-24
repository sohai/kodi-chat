import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => (
  <div className="root">
    <div className="app-bar">
      <h1>Kodify Chat</h1>
    </div>
    <div className="content">
      <div className="message outgoing">Messages</div>
      <div className="message incoming">Messages1</div>
      <div className="message outgoing">Messages2ge </div>
    </div>
    <div className="footer">
      <input type="text" placeholder="Type here..." className="input" />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
