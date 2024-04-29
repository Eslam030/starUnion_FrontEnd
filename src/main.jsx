import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
// import { AuthProvider } from "./Auth/AuthContext";
import { Provider } from 'react-redux'
import { store } from "./Auth/store";



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store} >
    <AppRouter/>
  </Provider>
);
