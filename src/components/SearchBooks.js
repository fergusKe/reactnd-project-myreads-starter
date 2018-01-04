import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import { Debounce } from 'react-throttle'
import BooksContent from './BooksContent'
import * as booksAPI from '../utils/BooksAPI'

class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state

    if (query && prevState.query !== query) {
      booksAPI
        .search(query)
        .then((books) => {
          this.setState({
            books
          })
        })
    }
  }

  updateQuery = (query) => {
    console.log('query = ', query)
    this.setState({
      query: query.trim()
    })
  }

	render() {
    const { changeShelf } = this.props
    const { books, query } = this.state

    let showingBooks = books

    books instanceof Array
    ? showingBooks && (
        showingBooks.sort(sortBy('title'))
      )
    : showingBooks = []

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="200" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </Debounce>
					</div>
        </div>
        <div className="search-books-results">
          {
            books instanceof Array
            ? <BooksContent books={showingBooks} query={query} changeShelf={changeShelf} />
            : <h1>Can not find book!!!</h1>
          }
				</div>
			</div>
		)
	}
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default SearchBooks
