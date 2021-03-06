import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ShowBook = ({match, books, searchedbooks}) => {
  const { id } = match.params
  const AllBooks = [...books, ...searchedbooks]

  const book = AllBooks.filter((b) => (
    b.id === id
  ))[0]

  if (!book) {
    return <div>loading...</div>
  }

  return (
    <div className="container mt-3">
      <Link to="/" className="btn btn-primary">Back to books list</Link>
      <div className="card" style={{width: '15rem'}}>
        <img className="card-img-top" src={book.imageLinks.thumbnail} alt={book.title} />
        <div className="card-body">
          <h4 className="card-title">{book.title}</h4>
          <p className="card-text book-authors">
            {
              book.authors && book.authors.map((name) => (
                <span key={name} className="name">{name}</span>
              ))
            }
          </p>
        </div>
      </div>
    </div>
  )
}

ShowBook.propTypes = {
  match: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  searchedbooks: PropTypes.array.isRequired,
}

export default ShowBook
