import { Link } from 'react-router-dom'
import { Button } from './Button'
import { useAuth } from '../context'

export const Nav = () => {
  const { signOut, isAuthenticated } = useAuth()
  const imgUrl = import.meta.env.VITE_LOGO_URL ?? 'cardohealth.webp'

  return (
    <header className='sticky top-0 z-[1] mb-16 w-full bg-[#5D5E3Faa] p-2 font-medium backdrop-blur-sm sm:px-10'>
      <nav className='flex min-h-[50px] w-full items-center justify-between'>
        <Link to='/'>
          <img
            src={imgUrl}
            alt='logo'
            width={150}
            height={150}
            className='object-contain'
          />
        </Link>
        <div className='flex gap-5 '>
          <Link
            to='/books'
            className='text-[#FAEEE4] transition-colors duration-500 hover:text-[#d7ab6e]'
          >
            Books
          </Link>
          <Link
            to='/add'
            className='text-[#FAEEE4] transition-colors duration-500 hover:text-[#d7ab6e]'
          >
            Add Book
          </Link>
          {!isAuthenticated ? (
            <Link
              to='/signin'
              className='text-[#FAEEE4] transition-colors duration-500 hover:text-[#d7ab6e]'
            >
              Sign in
            </Link>
          ) : (
            <Button
              onClick={signOut}
              className='text-[#FAEEE4] transition-colors duration-500 hover:text-[#d7ab6e]'
            >
              Sign out
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
