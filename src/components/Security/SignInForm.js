import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import signUpIcon from "../../images/alligator.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function SignInForm() {
  const {setIsLogin}=useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/api/login", formData);
      toast.success("Welcome " + response.data.username);
      const { username, token, authorities } = response.data;
      const role = authorities && authorities.length > 0 ? authorities[0].authority : "defaultRole"; // Nếu không có role, sẽ là 'defaultRole'
      setIsLogin(true);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      if (role.includes('ROLE_ADMIN')) {
        navigate("/admin");
      } else if (role.includes('ROLE_EMPLOYEE')) {
        navigate('/');
      } else if (role.includes('ROLE_MERCHANT')) {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during sign in.");
    }
  };

  return (
      <>
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
          <div
              className="login-form text-center p-4"
              style={{
                borderRadius: "8px",
                width: "80%",
                maxWidth: "1000px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
          >
            <section className="vh-100">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-12 col-xl-11">
                    <div
                        className="card text-black"
                        style={{ borderRadius: "25px" }}
                    >
                      <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                              Login
                            </p>
                            <form
                                className="mx-1 mx-md-4"
                                onSubmit={handleSubmit}
                            >
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                  <input
                                      onChange={handleChange}
                                      type="text"
                                      id="username"
                                      name="username"
                                      value={formData.username}
                                      className="form-control"
                                  />
                                  <label className="form-label" htmlFor="form3Example1c">
                                    Username
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                  <input
                                      onChange={handleChange}
                                      type="password"
                                      id="password"
                                      name="password"
                                      value={formData.password}
                                      className="form-control"
                                  />
                                  <label className="form-label" htmlFor="form3Example4c">
                                    Password
                                  </label>
                                </div>
                              </div>

                              <div className="text-center mb-3">
                                <a href="#" className="text-muted">
                                  Forgot your password?
                                </a>
                              </div>

                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                >
                                  Submit
                                </button>
                              </div>
                              <p className="text-center">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-primary">
                                  Register
                                </a>
                              </p>
                            </form>
                          </div>
                          <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                            <img
                                src={signUpIcon}
                                className="img-fluid"
                                alt="Sign-in image"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "auto",
                                }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
  );
}

export default SignInForm;
