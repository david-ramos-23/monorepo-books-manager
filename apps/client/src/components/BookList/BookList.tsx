import { BookType } from '../../../../server/src/models/book'
import { BookCard } from '../BookCard'

export const BookList = ({ books }: { books: BookType[] }) => {
  return (
    <div className='books grid items-center justify-center gap-10 md:grid-cols-2 lg:grid-cols-3'>
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  )
}
