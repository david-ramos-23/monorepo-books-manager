import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  getBooks,
  deleteBook as deleteBookRequest,
  saveBook as saveBookRequest,
  updateBook as updateBookRequest,
} from '../services/books'
import { BookFromValuesType } from '../types'
import { useAuth } from './auth'

interface BookContextState {
  books: any[]
  error: null | Error
  isLoading: boolean
  isError: boolean
}

interface BookContextInterface extends BookContextState {
  getAllBooks: () => void
  deleteBook: (id: string) => void
  saveBook: (book: BookFromValuesType) => void
  updateBook: (id: string, book: BookFromValuesType) => void
}
const BookContext = createContext<BookContextInterface | null>(null)

export const useBooks = () => {
  const context = useContext(BookContext)
  if (context == null)
    throw new Error('useBooks must be used within a BookProvider')
  return context
}

export function BookProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookContextState>({
    books: [],
    error: null,
    isError: false,
    isLoading: true,
  })

  const { isAuthenticated } = useAuth()

  const getAllBooks = async () => {
    try {
      const books = await getBooks()
      setState({ books, error: null, isLoading: false, isError: false })
    } catch (error) {
      setState({
        books: [],
        error: error as Error,
        isLoading: false,
        isError: true,
      })
      console.error(error)
    }
  }

  const deleteBook = async (bookId: string) => {
    try {
      await deleteBookRequest(bookId)
      const rest = state.books.filter((book) => book.id !== bookId)

      setState({ books: rest, error: null, isLoading: false, isError: false })
    } catch (error) {
      setState((currentState) => ({
        books: [...currentState.books],
        error: error as Error,
        isLoading: false,
        isError: true,
      }))
      console.error(error)
    }
  }

  const saveBook = async (book: BookFromValuesType) => {
    try {
      const savedBook = await saveBookRequest(book)
      setState((currentState) => {
        const books = [...currentState.books, savedBook]
        return {
          books,
          error: null,
          isLoading: false,
          isError: false,
        }
      })
    } catch (error) {
      setState((currentState) => ({
        books: [...currentState.books],
        error: error as Error,
        isLoading: false,
        isError: true,
      }))
      console.error(error)
    }
  }

  const updateBook = async (bookId: string, book: BookFromValuesType) => {
    try {
      const updatedBooks = await updateBookRequest({ bookId, book })
      setState({
        books: updatedBooks,
        error: null,
        isLoading: false,
        isError: false,
      })
    } catch (error) {
      setState((currentState) => ({
        books: [...currentState.books],
        error: error as Error,
        isLoading: false,
        isError: true,
      }))
      console.error(error)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return
    try {
      void getAllBooks()
    } catch (error) {
      console.error(error)
    }
  }, [isAuthenticated])

  return (
    <BookContext.Provider
      value={{
        getAllBooks,
        deleteBook,
        saveBook,
        updateBook,
        ...state,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
