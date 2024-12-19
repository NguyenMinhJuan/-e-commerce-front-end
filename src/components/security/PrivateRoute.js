// components/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    // Lấy user từ localStorage và parse JSON
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    // Lấy token từ localStorage
    const isAuthenticated = localStorage.getItem('token');

    // Kiểm tra đăng nhập
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // Kiểm tra role từ user object
    const hasRequiredRole = user && allowedRoles.includes(user.role);

    // Nếu không có quyền truy cập
    if (!hasRequiredRole) {
        return <Navigate to="/access-denied" replace />;
    }

    // Nếu có quyền thì render các route con
    return <Outlet />;
};

export default PrivateRoute;