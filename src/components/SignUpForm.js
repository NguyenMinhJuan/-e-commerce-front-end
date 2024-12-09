import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paintImage from '../images/paint.png';
import axios from "axios";

function SignUpForm() {
    const [formData,setFormData] = React.useState({
        username:'',
        password:'',
        email:'',
        repeatPassword:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8001/api/user/signUp', formData);
            alert('Sign up successful!');
        } catch (error) {
            console.error('There was an error!', error);
            alert('Sign up failed!');
        }
    };

    return (
        <>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                <div className="login-form text-center p-4"
                     style={{ borderRadius: '8px', width: '80%', maxWidth: '1000px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <section className="vh-100">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-12 col-xl-11">
                                    <div className="card text-black" style={{ borderRadius: "25px" }}>
                                        <div className="card-body p-md-5">
                                            <div className="row justify-content-center">
                                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input onChange={handleChange} type="text" id="" name="username" value={formData.username} className="form-control" />
                                                                <label className="form-label" htmlFor="form3Example1c">Username</label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input onChange={handleChange} type="email" id="" name="email" value={formData.email} className="form-control" />
                                                                <label className="form-label" htmlFor="form3Example3c">Email</label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input onChange={handleChange} type="password" id="" name="password" value={formData.password} className="form-control" />
                                                                <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input onChange={handleChange} type="password" id="" name="repeatPassword" value={formData.repeatPassword} className="form-control" />
                                                                <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-check d-flex justify-content-center mb-5">
                                                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                            <label className="form-check-label" htmlFor="form2Example3">
                                                                I agree all statements in <a href="#!">Terms of service</a>
                                                            </label>
                                                        </div>
                                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                            <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                                    <img
                                                        src={paintImage}
                                                        className="img-fluid" alt="Sign-up image"
                                                        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
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

export default SignUpForm;
