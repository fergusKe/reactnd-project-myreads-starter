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
    query: '',
    isHasBookCanFind: true,
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state

    if (prevState.query === query) return false

    if (query) {
      booksAPI
        .search(query)
        .then((books) => {
          if (books instanceof Array) {
            this.setState({
              books,
              isHasBookCanFind: true
            })
          } else {
            this.setState({
              books: [],
              isHasBookCanFind: false
            })
          }
        })
    } else {
      this.setState({
        books: [],
        isHasBookCanFind: true
      })
    }
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

	render() {
    const { changeShelf } = this.props
    const { books, query, isHasBookCanFind } = this.state

    books.sort(sortBy('title'))

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="100" handler="onChange">
              <input
                type="text"
                placeholder="Search book"
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </Debounce>
					</div>
        </div>
        <div className="search-books-results">
          {
            query
            ? isHasBookCanFind
              ? <BooksContent books={books} query={query} changeShelf={changeShelf} />
              : <h1>Can not find book!!!</h1>
            : <h1>Please enter the word to search book</h1>
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
