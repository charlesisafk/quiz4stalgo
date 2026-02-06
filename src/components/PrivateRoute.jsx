import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowedRoles }) => {
    const userLogin = useSelector(state => state.userLogin) || {};
    const { userInfo } = userLogin;

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to access this page.</p>
                <p>Required role: {allowedRoles.join(', ')}</p>
            </div>
        );
    }

    return children;
};

export default PrivateRoute;
