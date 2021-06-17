import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/Fonts/Vazir-Bold.ttf';
import './assets/Fonts/Vazir-Regular.ttf';
import { BrowserRouter } from 'react-router-dom';
import store from './Redux/index.redux';
import { Provider } from 'react-redux';
import Modal from './Components/Modal/Modal';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Modal></Modal>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
