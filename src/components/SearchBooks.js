import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import { Debounce } from 'react-throttle'
import BooksContent from './BooksContent'

class SearchBooks extends Component {
  state = {
    query: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state

    if (prevState.query !== query) {
      this.props.searchingBooks(query)
    }
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

	render() {
    const { books, searchedbooks, isHasBookCanFind, changeShelf } = this.props
    const { query } = this.state

    let newSearchedbooks = searchedbooks.map(searchedbook => {
      let newSearchedbook = { ...searchedbook }

      // If this book on the shelf, make it the same
      books.forEach(b => {
        if (b.id === newSearchedbook.id) {
          newSearchedbook.shelf = b.shelf
        }
      })
      return newSearchedbook
    })

    newSearchedbooks.sort(sortBy('title'))

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
              ? <BooksContent books={newSearchedbooks} query={query} changeShelf={changeShelf} />
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
  searchedbooks: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  isHasBookCanFind: PropTypes.bool.isRequired,
}

export default SearchBooks
