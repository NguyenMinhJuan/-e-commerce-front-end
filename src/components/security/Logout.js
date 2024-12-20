import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function Logout() {
    const navigate = useNavigate();
    const {setIsLogin} = useAuth();

    useEffect(() => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        localStorage.removeItem("user")
        navigate("/signin");
        toast.success("Logged out successfully!");
        setIsLogin(false);
    }, [setIsLogin])
}

export default Logout;