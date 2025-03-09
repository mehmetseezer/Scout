import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { auth } = useAuth();
    console.log(`Auth_Tokens: ${auth.tokens}`);
    if (!auth.tokens || !auth.tokens.access) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default PrivateRoutes;
