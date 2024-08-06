import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import NavbarMenu from '../layout/NavbarMenu'

const ProtectedRoute = () => {
    const {
        authState: { user }
    } = useContext(AuthContext)

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return (
        <>
            <NavbarMenu />
            <Outlet />
        </>
    )
}

export default ProtectedRoute