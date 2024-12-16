import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductList from './components/product/ProductList';
import AddProduct from './components/product/AddProduct';
import ProductDetail from './components/product/ProductDetail';
import EditProduct from './components/product/EditProduct';
import SignInForm from './components/Security/SignInForm';
import SignUpForm from './components/Security/SignUpForm';
import AdminLayout from './components/admin/AdminLayout';  // Layout chung cho admin
import { AuthProvider } from './context/AuthContext';
import Logout from './components/Security/Logout';
import Cart from './components/Cart';
import {EmployeesList} from "./components/admin/Employee/EmployeesList";
import {EmployeesCreate} from "./components/admin/Employee/EmployeeCreate";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/products/edit/:id" element={<EditProduct />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/signin" element={<SignInForm />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                    </Route>

                    {/* AdminLayout sẽ bao gồm Employee Management */}
                    <Route path="/admin/*" element={<AdminLayout />}>
                        <Route path="employees" element={<EmployeesList />} />  {/* Danh sách nhân viên */}
                        <Route path="employees/add" element={<EmployeesCreate />}></Route>
                    </Route>

                    <Route path="*" element={<div>404 - Page not found</div>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
