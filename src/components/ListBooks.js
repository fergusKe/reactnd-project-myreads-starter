import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/fontawesome-free-solid'
import BooksContent from './BooksContent'

class ListBooks extends Component {
	static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
	}

	render() {
		const { books, changeShelf } = this.props

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
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
