import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
	}

	state = {
		books: [],
		currentlyReading: [],
		wantToRead: [],
		read: [],
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.books !== this.state.books) {
			let shelfObj = {}
	
			nextProps.books.map((book, i, arr) => {
				if (!shelfObj[book.shelf]) {
					shelfObj[book.shelf] = []
				}

				shelfObj[book.shelf].push(book)
	
				if (i === arr.length - 1) {
					this.setState({
						books: nextProps.books,
						currentlyReading: shelfObj.currentlyReading,
						wantToRead: shelfObj.wantToRead,
						read: shelfObj.read
					})
				}
			})
		}
	}

	render() {
		const { currentlyReading, wantToRead, read } = this.state

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf title="Currently Reading" books={currentlyReading} />
						<Bookshelf title="Want to Read" books={wantToRead} />
						<Bookshelf title="Read" books={read} />
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