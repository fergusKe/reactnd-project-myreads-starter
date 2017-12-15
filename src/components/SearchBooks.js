import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BooksContent from './BooksContent'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

	render() {
    const { books, changeShelf } = this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('title'))

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />

					</div>
				</div>
				<div className="search-books-results">
          <BooksContent books={showingBooks} changeShelf={changeShelf} />
				</div>
			</div>
		)
	}
}

export default SearchBooks
