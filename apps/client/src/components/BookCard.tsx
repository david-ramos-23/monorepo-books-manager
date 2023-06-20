import { Button } from './Button'
import { Card } from './Card'
import { Link } from 'react-router-dom'
import { IconTrash } from '@tabler/icons-react'
import { useBooks } from '../context'
import { BookType } from '../../../server/src/models/book'

export function BookCard({ book }: { book: BookType }) {
  const { deleteBook } = useBooks()

  return (
    <Card
      imgUrl={
        book.image !== '' ? book.image : import.meta.env.VITE_FALLBACK_IMG_URL
      }
    >
      <Link to={`/edit/${book.id}`} className=''>
        <header className='flex justify-between'>
          <h1 className='text-2xl font-bold'>{book.title}</h1>
        </header>
        <p className='text-slate-400'>{book.author}</p>
        <p className='my-5 w-[inherit] break-words'>{book.description}</p>
      </Link>
      <div className='flex items-center'>
        <Button onClick={() => deleteBook(book.id)}>
          <IconTrash />
        </Button>
      </div>
    </Card>
  )
}
