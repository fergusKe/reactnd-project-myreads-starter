import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/fontawesome-free-solid'
import { Button } from 'reactstrap'
import BooksContent from './BooksContent'

class ListBooks extends Component {
	static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  }

	render() {
    const { books, changeShelf, initBooks } = this.props
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
}

export default ListBooks
