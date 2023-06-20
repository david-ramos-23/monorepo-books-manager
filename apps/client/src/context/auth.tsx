import {
  getLoggedInUser,
  login,
  logout,
  signUp as signUpRequest,
} from '../services/auth'
import { SignInFormValuesType, SignUpFormValuesType } from '../types'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/types'

interface AuthContextState {
  user: any | undefined
  error: Error | null
  isAuthenticated: boolean
  isLoading: boolean
  isError: boolean
}

interface AuthContextInterface extends AuthContextState {
  signUp: (user: SignUpFormValuesType) => void
  signIn: (user: SignInFormValuesType) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextInterface | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null)
    throw new Error(
      'AuthContext not found. Must be used within an AuthProvider'
    )
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthContextState>({
    user: undefined,
    error: null,
    isError: false,
    isLoading: true,
    isAuthenticated: false,
  })
  const navigate = useNavigate()

  const signUp = async (user: SignUpFormValuesType) => {
    try {
      const savedUser = await signUpRequest(user)
      setState({
        user: savedUser,
        error: null,
        isError: false,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      console.error(error)
      setState((currentState) => ({
        ...currentState,
        error: error as Error,
        isError: true,
        isLoading: false,
        isAuthenticated: false,
      }))
    }
  }

  const signIn = async (user: SignInFormValuesType) => {
    try {
      const currentUser = await login(user)
      setState({
        user: currentUser,
        error: null,
        isError: false,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      console.error(error)
      setState((currentState) => ({
        ...currentState,
        error: error as Error,
        isError: true,
        isLoading: false,
        isAuthenticated: false,
      }))
    }
  }

  const signOut = async () => {
    try {
      await logout()
      setState({
        user: undefined,
        error: null,
        isError: false,
        isLoading: false,
        isAuthenticated: false,
      })

      navigate(ROUTES.SignIn)
    } catch (error) {
      setState((currentState) => ({
        ...currentState,
        error: error as Error,
        isError: true,
        isLoading: false,
      }))
      console.error(error)
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const authUser = await getLoggedInUser()
        if (authUser === undefined) {
          return setState({ ...state, isAuthenticated: false })
        }
        setState({
          user: authUser,
          error: null,
          isError: false,
          isLoading: false,
          isAuthenticated: true,
        })

        navigate(ROUTES.Books)
      } catch (error) {
        setState((currentState) => ({
          ...currentState,
          error: error as Error,
          isError: true,
          isLoading: false,
          isAuthenticated: false,
        }))
      }
    }
    void checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
