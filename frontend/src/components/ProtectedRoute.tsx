import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const ProtectedRoute = ({ children, adminOnly }: { children: ReactNode, adminOnly?: boolean }) => {

    const { user } = useSelector((state: RootState) => state.auth)
    const location = useLocation()

    
    const protectedPaths = ["/wishlist", "/cart"]

    const isProtectedPage = protectedPaths.includes(location.pathname)

    
    if (!user && isProtectedPage) {
        return <Navigate to="/register" replace />
    }

   
    if (user && adminOnly) {
        return user?.isAdminstartor ? children : <Navigate to="/" replace />
    }

    
    return children
}

export default ProtectedRoute
