import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth.context'
import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {

    const [ok,setOk] = useState<boolean>(false);
    const {auth} = useAuth();

    useEffect(() => {
        if (auth.token) {
            setOk(true);
        } else {
            setOk(false);
        }
    }, [auth.token]);

    return ok ? <Outlet/> : <h1 className='font-serif text-cyan-400 font-medium text-center text-4xl pt-28'>Login To Access Dashboard</h1>
}
