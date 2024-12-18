import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import paintImage from '../../images/paint.png';

// Validation Schema
const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be between 6 and 15 characters')
        .max(15, 'Username must be between 6 and 15 characters'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be between 6 and 32 characters')
        .max(32, 'Password must be between 6 and 32 characters'),
    repeatPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function SignUpForm() {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Remove repeatPassword before sending to backend
            const { repeatPassword, ...submitData } = values;
            const response = await axios.post('http://localhost:8001/api/user/signUp', submitData);
            toast.success(response.data);
        } catch (error) {
            if (error.response) {
                toast.error('Invalid information!');
            } else if (error.request) {
                toast.error('No response from server');
            } else {
                toast.error('Error during signup');
            }
        } finally {
            setSubmitting(false);
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
                                                    <Formik
                                                        initialValues={{
                                                            username: '',
                                                            email: '',
                                                            password: '',
                                                            repeatPassword: ''
                                                        }}
                                                        validationSchema={SignupSchema}
                                                        onSubmit={handleSubmit}
                                                    >
                                                        {({ errors, touched, isSubmitting }) => (
                                                            <Form className="mx-1 mx-md-4">
                                                                <div className="d-flex flex-row align-items-center mb-4">
                                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                                    <div className="form-outline flex-fill mb-0">
                                                                        <Field
                                                                            type="text"
                                                                            name="username"
                                                                            className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                                                                            placeholder={"Username"}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="username"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex flex-row align-items-center mb-4">
                                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                                    <div className="form-outline flex-fill mb-0">
                                                                        <Field
                                                                            type="email"
                                                                            name="email"
                                                                            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                                                            placeholder={"Email"}

                                                                        />
                                                                        <ErrorMessage
                                                                            name="email"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex flex-row align-items-center mb-4">
                                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                                    <div className="form-outline flex-fill mb-0">
                                                                        <Field
                                                                            type="password"
                                                                            name="password"
                                                                            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                                                            placeholder={"Password"}

                                                                        />
                                                                        <ErrorMessage
                                                                            name="password"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex flex-row align-items-center mb-4">
                                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                                    <div className="form-outline flex-fill mb-0">
                                                                        <Field
                                                                            type="password"
                                                                            name="repeatPassword"
                                                                            className={`form-control ${touched.repeatPassword && errors.repeatPassword ? 'is-invalid' : ''}`}
                                                                            placeholder={"Repeat your password"}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="repeatPassword"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="form-check d-flex justify-content-center mb-5">
                                                                    <Field
                                                                        type="checkbox"
                                                                        name="terms"
                                                                        className="form-check-input me-2"
                                                                        required
                                                                    />
                                                                    <label className="form-check-label">
                                                                        I agree all statements in <a href="/terms">Terms of service</a>
                                                                    </label>
                                                                </div>

                                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-primary btn-lg"
                                                                        disabled={isSubmitting}
                                                                    >
                                                                        Register
                                                                    </button>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                    <div className="text-center">
                                                        <p className="text-muted">
                                                            Already have an account? <a href="/signin" className="text-primary">Login here</a>
                                                        </p>
                                                    </div>
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