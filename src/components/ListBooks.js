import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/fontawesome-free-solid'
import { Button } from 'reactstrap'
import BooksContent from './BooksContent'

const ListBooks = ({books, changeShelf, initBooks}) => {
  const resetBooksBtnStyle = { margin: '20px 20px 0 20px' }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <Button onClick={initBooks} style={resetBooksBtnStyle} color="secondary">init books</Button>
      <BooksContent books={books} changeShelf={changeShelf} />
      <div className="open-search">
        <Link to="/search">
          <FontAwesomeIcon icon={faSearch} />
        </Link>
      </div>
      <div className="open-cerate">
        <Link to="/create">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default ListBooks
