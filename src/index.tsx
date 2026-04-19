import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import * as Yup from 'yup';

import store from './app/store'
import App from "./app/App";

import "./index.scss";

Yup.setLocale({
  mixed: {
    default:'Data tidak valid',
    required: 'Wajib diisi',
    notType: "Data tidak valid",
  },
  number: {
    min: 'Minimal ${min} karakter',
    max: 'Maksimal ${max} karakter',
  },
  string: {
    min: 'Minimal ${min} karakter',
    max: 'Maksimal ${max} karakter',
  },
});

const root = ReactDOM.createRoot((document.getElementById("root") as any))
root.render(<Provider store={store}>
  <App />
</Provider>);