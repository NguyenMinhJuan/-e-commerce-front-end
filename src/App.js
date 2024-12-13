import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductList from './components/product/ProductList';
import AddProduct from './components/product/AddProduct';
import ProductDetail from './components/product/ProductDetail';
import EditProduct from './components/product/EditProduct';
import SignInForm from './components/Security/SignInForm';
import SignUpForm from "./components/Security/SignUpForm";
import Admin from "./components/admin/Admin";
import {AuthProvider} from "./context/AuthContext";
import Logout from "./components/Security/Logout";
import Cart from "./components/Cart";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/add-product" element={<AddProduct/>}/>
                        <Route path="/products/edit/:id" element={<EditProduct/>}/>
                        <Route path="/products/:id" element={<ProductDetail/>}/>
                        <Route path="/signin" element={<SignInForm/>}/>
                        <Route path="/signup" element={<SignUpForm/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/products" element={<ProductList/>}/>
                        <Route path="/" element={<ProductList/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        />
                        <Route path="*" element={<div>404 - Page not found</div>}/>
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;