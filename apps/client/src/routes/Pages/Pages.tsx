import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { protectedRoutes, routes } from '..'
import { useAuth } from '../../context'
import { Spinner } from '../../components'

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <Spinner />
  if (!isAuthenticated && !isLoading) return <Navigate to='/signin' replace />
  return <Outlet />
}

export function Pages() {
  return (
    <Routes>
      {Object.values(routes).map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route element={<ProtectedRoute />}>
        {Object.values(protectedRoutes).map(
          ({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          )
        )}
      </Route>
    </Routes>
  )
}
