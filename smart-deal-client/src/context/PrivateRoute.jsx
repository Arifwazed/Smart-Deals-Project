import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoaderSpin from '../components/Home/LoaderSpin';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <LoaderSpin></LoaderSpin>;
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/register" replace></Navigate>
};

export default PrivateRoute;