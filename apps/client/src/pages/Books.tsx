import { BookList } from '../components/BookList/BookList'
import { NoBooks } from '../components/NoBooks'
import { useAuth, useBooks } from '../context'
import { ROUTES } from '../routes/types'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingOrError } from '../components/LoadingOrError'

export function Books(): ReactElement {
  const { isAuthenticated } = useAuth()
  const { isLoading, isError, books, error } = useBooks()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate(ROUTES.SignIn)
  }

  if (isLoading || Boolean(isError)) {
    return <LoadingOrError error={error as Error} />
  }

  return <>{books.length === 0 ? <NoBooks /> : <BookList books={books} />}</>
}
