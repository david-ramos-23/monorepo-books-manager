import type { BookType } from '../../../server/src/models/book'
import { fetchData } from './utils'

export async function getBooks(): Promise<BookType[]> {
  return await fetchData('/api/books', { method: 'GET' })
}

export async function getBook(bookId: string): Promise<BookType> {
  return await fetchData(`/api/books/${bookId}}`, { method: 'GET' })
}

interface SaveBookRequest {
  author: string
  description: string
  image: string
  title: string
}

export async function saveBook({
  author,
  description,
  image,
  title,
}: SaveBookRequest): Promise<BookType> {
  return await fetchData('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ author, description, image, title }),
  })
}

interface UpdateBookRequest {
  bookId: string
  book: SaveBookRequest
}

export async function updateBook({
  bookId,
  book,
}: UpdateBookRequest): Promise<BookType[]> {
  return await fetchData(`/api/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
}

export async function deleteBook(bookId: string) {
  await fetchData(`/api/books/${bookId}`, { method: 'DELETE' })
}
