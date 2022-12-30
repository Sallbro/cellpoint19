import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.html';
import Propdemagkharab from './Propdemagkharab';
import 'bootstrap/dist/css/bootstrap.css';
// import App from './App';

//redux store
//remove item store
import { Provider } from 'react-redux'
import { Store } from './redux/store'
console.log("store from index ", Store.getState());



ReactDOM.render(

  <Provider store={Store}>
    <Propdemagkharab />
  </Provider>,
  document.getElementById('root')
);

// export { Addca };
// export default Chalbe;
// export {ind};