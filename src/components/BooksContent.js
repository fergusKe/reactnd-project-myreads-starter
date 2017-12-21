import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class BooksContent extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    query: PropTypes.string,
    changeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { books, query, changeShelf } = this.props
		const currentlyReading = []
		const wantToRead = []
		const read = []

		books.forEach((book) => {
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

    return (
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={currentlyReading} query={query} changeShelf={changeShelf} />
          <Bookshelf title="Want to Read" books={wantToRead} query={query} changeShelf={changeShelf} />
          <Bookshelf title="Read" books={read} query={query} changeShelf={changeShelf} />
        </div>
      </div>
    )
  }
}

export default BooksContent
