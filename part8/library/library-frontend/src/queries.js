import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author {
      name 
    }
    id
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    id
    born
    bookCount
  }
}
`


export const CREATE_BOOK = gql`
mutation createBook(
  $title: String!
  $author: String!
  $published: Int!
  $genres: [String!]!
) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author
    published
  }
}
`

export const EDIT_BIRTH_YEAR = gql`
  mutation editBirthYear ($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`