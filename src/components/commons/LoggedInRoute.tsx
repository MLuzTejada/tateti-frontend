import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSessionToken } from "../../store/tokenStore"

export const StateLoggedInRoute = () => {
  const token = useSessionToken();
  let location = useLocation();

  const isAuthenticated = token !== undefined;

  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/' state={{ from: location }} />
  )
}