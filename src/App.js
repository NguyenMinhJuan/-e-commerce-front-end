import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductList from './components/product/ProductList';
import AddProduct from './components/product/AddProduct';
import ProductDetail from './components/product/ProductDetail';
import EditProduct from './components/product/EditProduct';
import SignInForm from './components/security/login/SignInForm';
import SignUpForm from './components/security/register/SignUpForm';
import AdminLayout from './components/admin/AdminLayout';  // Layout chung cho admin
import { AuthProvider } from './context/AuthContext';
import Logout from './components/security/Logout';
import Cart from './components/cart/Cart';
import {EmployeesList} from "./components/admin/employee/EmployeesList";
import {EmployeesCreate} from "./components/admin/employee/EmployeeCreate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TermOfServices from "./components/security/terms/TermsOfServices";
import PartnerRegistration from "./components/merchant/PartnerRegistrationForm";
import {AccessDenied} from "./components/security/AccessDenied";
import PrivateRoute from "./components/security/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/products/edit/:id" element={<EditProduct />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                    </Route>

                    <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
                        <Route path="/admin/*" element={<AdminLayout />}>
                            <Route path="employees" element={<EmployeesList />} />
                            <Route path="employees/add" element={<EmployeesCreate />} />
                        </Route>
                    </Route>
                    <Route>
                        <Route path="/terms" element={<TermOfServices/>}></Route>
                        <Route path="/become-merchant" element={<PartnerRegistration/>}></Route>
                        <Route path="/access-denied" element={<AccessDenied/>}></Route>
                        <Route path="/signin" element={<SignInForm />} />
                        <Route path="/signup" element={<SignUpForm />} />
                    </Route>
                    <Route path="*" element={<div>404 - Page not found</div>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
