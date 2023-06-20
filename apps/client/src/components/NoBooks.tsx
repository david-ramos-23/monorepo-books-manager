import { Link } from 'react-router-dom'

export const NoBooks = () => (
  <div className='flex flex-col gap-3 py-16 text-xl'>
    <p>
      You don't have <span className='text-2xl'>📚</span> saved.
    </p>
    <p className='flex gap-2'>
      Start adding one
      <Link
        to='/add'
        className='transition-color text-sky-500 duration-500 hover:text-sky-700'
      >
        here!
      </Link>
    </p>
  </div>
)
