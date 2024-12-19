import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";

function AddToCart(){
    useEffect(() => {
        axios.post("http://localhost:8000/api/cart/addToCart").then((response) => {

        })
    }, []);
}