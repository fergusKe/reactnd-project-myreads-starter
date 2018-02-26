import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'
import Book from './Book'

const Bookshelf = ({title, books, query, changeShelf}) => {
	return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length && books.map((book) => (
            <ScrollAnimation
              key={book.id}
              animateIn="fadeIn"
              animateOnce={true}
            >
              <Book key={book.id} book={book} query={query} changeShelf={changeShelf} />
            </ScrollAnimation>
          ))}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  query: PropTypes.string,
  changeShelf: PropTypes.func.isRequired,
}

export default Bookshelf
