import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const {user, loading} = useContext(AuthContext);

    if (loading) {
        return <p>Carregando. . .</p>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;