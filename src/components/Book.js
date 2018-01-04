import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'

const Book = ({book, query, changeShelf}) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link
            className="book-cover"
            to={`/books/${book.id}`}
            style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => changeShelf(e.target.value, book)} >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {
            book.title && (
              <Highlighter
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={book.title}
              />
            )
          }
        </div>
        <div className="book-authors">
          {
            book.authors && book.authors.map((name) => (
              <Highlighter
                key={name}
                className="name"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={name}
              />
            ))
          }
        </div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  query: PropTypes.string,
  changeShelf: PropTypes.func.isRequired,
}

export default Book
