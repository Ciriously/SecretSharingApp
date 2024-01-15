import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-MW3DGQM0CWmQ4ors1x00kyuWBarou_o",
  authDomain: "secretsapp-1efe2.firebaseapp.com",
  databaseURL: "https://secretsapp-1efe2-default-rtdb.firebaseio.com",
  projectId: "secretsapp-1efe2",
  storageBucket: "secretsapp-1efe2.appspot.com",
  messagingSenderId: "1032494962973",
  appId: "1:1032494962973:web:1d746e05de158dd11229f4",
};

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-xl0nci16ko8yn7js.us.auth0.com"
    clientId="AqhsYsvghCnwpRt2coVqS5BMZtGRaotl"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
const app = initializeApp(firebaseConfig);
