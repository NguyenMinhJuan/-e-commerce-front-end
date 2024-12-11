import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Logout() {
    const navigate = useNavigate();
    const {setIsLogin}=useAuth();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    setIsLogin(true);
    navigate("/signin");
}

export default Logout;
