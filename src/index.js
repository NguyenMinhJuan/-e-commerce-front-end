import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App/>
        <ToastContainer/>
    </React.StrictMode>
);
