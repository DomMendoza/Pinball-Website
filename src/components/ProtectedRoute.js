/* eslint-disable */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
const ProtectedRoute = ({ Component }) => {
    const { authToken } = useAuth();

    if (authToken) {
        return <Component />;
    }
    return <Navigate to="/" />;
};

export default ProtectedRoute;
