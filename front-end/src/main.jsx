import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/router";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import {ToastContainer} from 'react-toastify'
// import  StandbyProvider  from "./context/isStandbyContext";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root")).render(

    <AuthProvider store={store}>
      {/* <StandbyProvider> */}
      <ToastContainer closeOnClick="true" />
        <Router />
      {/* </StandbyProvider> */}
    
    </AuthProvider>

);