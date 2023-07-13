import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({setIsAdmin}) => {
 
    let auth = {'token':localStorage.getItem("Email")}
    let isadmin = localStorage.getItem("User")
    setIsAdmin(isadmin)
    console.log(setIsAdmin)

    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
