import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ToastContainer} from "react-toastify";
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <App/>
        <ToastContainer position="bottom-right"/>
    </>
);
