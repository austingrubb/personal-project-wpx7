import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Route} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

const render = () => {
    ReactDOM.render(
        <Route>
          <AppContainer>
            <App />
          </AppContainer>
        </Route>,
      document.getElementById('root')
    );
  };

render();

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }
