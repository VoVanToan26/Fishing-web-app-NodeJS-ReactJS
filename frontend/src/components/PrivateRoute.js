import React from 'react';
import { Navigate } from 'react-router-dom';
import SigninPage from '~/Pages/User/SigninPage';

function PrivateRoute(
    {
        isAllowed,
        redirectPath = '/',
        children,
    }
) {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <SigninPage />;
};
export default PrivateRoute;