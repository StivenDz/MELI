import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@routes/App';
import '@styles/index.css';

import { initializeFirebaseService, getUser, getUsers, getSpecificUserByEmail, insertNewUser } from '@service/firebase';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


initializeFirebaseService();

//test service functions
// getUser();
// getUsers();
// getSpecificUserByEmail()
//   .then(res => console.log(res))
//   .catch(err => console.log("err executing getSpecificUserByEmail"));
// insertNewUser({
//   email: "stivendiazh@gmail.com",
//   password: "123456789",
//   username: "stiven",
//   phone: "+57 3003779033"
// })
// insertNewUser({
//   email: "alexa@gmail.com",
//   password: "alexa123",
//   username: "alexa"
// })

library.add(fas, far);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
