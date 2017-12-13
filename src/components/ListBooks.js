import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
	}

	render() {
		const { books, changeShelf } = this.props
		const currentlyReading = []
		const wantToRead = []
		const read = []

		books.map((book) => {
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

			return book
		})

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf title="Currently Reading" books={currentlyReading} changeShelf={changeShelf} />
						<Bookshelf title="Want to Read" books={wantToRead} changeShelf={changeShelf} />
						<Bookshelf title="Read" books={read} changeShelf={changeShelf} />
					</div>
				</div>
				<div className="open-search">
					<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
				</div>
			</div>
		)
	}
}

export default ListBooks