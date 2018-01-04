import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Book from './Book'
import '../stylesheet/animate.scss'

const Bookshelf = ({title, books, query, changeShelf}) => {
	return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <TransitionGroup
          className="books-grid"
          component="ol"
        >
          {books.map((book) => (
            <CSSTransition key={book.id} classNames="fade" timeout={300}>
              <Book key={book.id} book={book} query={query} changeShelf={changeShelf} />
            </CSSTransition>
          ))}
        </TransitionGroup>
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
