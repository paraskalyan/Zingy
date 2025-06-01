import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }) => {
    const currentUser = useSelector((state) => state.user.currentUser);

    return !currentUser ? children : <Navigate to="/" />;
};

export default PublicRoute;
