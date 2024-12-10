import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';
import SignInForm from './components/SignInForm';
import SignUpForm from "./components/SignUpForm";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/product/edit/:id" element={<EditProduct />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/" element={<ProductList />} />
                    <Route path="*" element={<div>404 - Page not found</div>} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
