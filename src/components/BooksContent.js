import React from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

const BooksContent = ({books, query, changeShelf}) => {
  const currentlyReading = []
  const wantToRead = []
  const read = []

  // Not in Searching
  if (query === undefined) {
    books.length && books.forEach((book) => {
      switch (book.shelf) {
        case 'currentlyReading':
          currentlyReading.push(book)
          break
        case 'wantToRead':
          wantToRead.push(book)
          break
        case 'read':
          read.push(book)
          break
        default:
      }
    })
  }

  return (
    <div className="list-books-content">
      {
        query === undefined
        ? (
          <div>
            <Bookshelf title="Currently Reading" books={currentlyReading} query={query} changeShelf={changeShelf} />
            <Bookshelf title="Want to Read" books={wantToRead} query={query} changeShelf={changeShelf} />
            <Bookshelf title="Read" books={read} query={query} changeShelf={changeShelf} />
          </div>
        )
        : (
          <Bookshelf title="Searching books add to bookshelf" books={books} query={query} changeShelf={changeShelf} />
        )
      }
    </div>
  )
}

BooksContent.propTypes = {
  books: PropTypes.array.isRequired,
  query: PropTypes.string,
  changeShelf: PropTypes.func.isRequired,
}

export default BooksContent
