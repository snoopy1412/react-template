import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import rootStore from './store';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider store={rootStore}>
<App />
</Provider>
, document.getElementById('root'));
registerServiceWorker();
