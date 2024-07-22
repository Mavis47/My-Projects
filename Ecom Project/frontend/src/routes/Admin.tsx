import  { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth.context'
import { Outlet } from 'react-router-dom';

export default function AdminRoute() {

    const {auth} = useAuth();
    const [admin,setAdmin] = useState(false);

    useEffect(() => {
       if(auth?.user?.role === 1 && auth.token){
          setAdmin(true)
       }else{
          setAdmin(false)
       }
    },[auth])
    
    return admin ? <Outlet/> : <h1 className='font-serif text-4xl text-center text-yellow-800 font-light pt-11'>Not Authorized</h1>

}
