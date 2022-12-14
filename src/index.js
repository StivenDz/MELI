import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@routes/App';
import '@styles/index.css';

import { initializeFirebaseService} from '@service/firebase';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {fab} from "@fortawesome/free-brands-svg-icons";


initializeFirebaseService();

library.add(fas, far,fab);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
