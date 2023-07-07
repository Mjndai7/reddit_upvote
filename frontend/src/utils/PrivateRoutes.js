import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({setIsAdmin}) => {
    
    if(localStorage.getItem("Email") === "admin@maxupvote.com"){
        setIsAdmin(true)
    }

    let auth = {'token':localStorage.getItem("Email")}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes