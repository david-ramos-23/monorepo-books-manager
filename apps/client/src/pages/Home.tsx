import { NoAuthUser } from '../components/NoAuthUser'
import { useAuth } from '../context'
import { ROUTES } from '../routes/types'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function Home(): ReactElement {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    toast.success('Sucessfully logged in!')
    navigate(ROUTES.Books)
  }

  return <NoAuthUser />
}
