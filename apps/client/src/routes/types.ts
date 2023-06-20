import { FC } from 'react'
import { PathRouteProps } from 'react-router-dom'

export enum UnprotectedPages {
  Home = 'Home',
  SignUp = 'SignUp',
  SignIn = 'SignIn',
  NotFound = 'NotFound',
}

export enum ProtectedPages {
  Books = 'Books',
  AddBook = 'AddBook',
  EditBook = 'EditBook',
}

export const ROUTES = {
  [UnprotectedPages.Home]: '/',
  [ProtectedPages.Books]: '/books',
  [UnprotectedPages.SignUp]: '/signup',
  [UnprotectedPages.SignIn]: '/signin',
  [ProtectedPages.AddBook]: '/add',
  [ProtectedPages.EditBook]: '/edit/:id',
  [UnprotectedPages.NotFound]: '*',
}

interface PathRouteCustomProps {
  title?: string
  component: FC
}

type Routes = Record<UnprotectedPages, PathRouteProps & PathRouteCustomProps>
type ProtectedRutes = Record<
  ProtectedPages,
  PathRouteProps & PathRouteCustomProps
>

export type { Routes, ProtectedRutes }
