import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import { Debounce } from 'react-throttle'
import BooksContent from './BooksContent'

class SearchBooks extends Component {
  state = {
    books: [],
    query: '',
    isHasBookCanFind: true,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchedbooks !== this.state.books ||
        nextProps.isHasBookCanFind !== this.state.isHasBookCanFind) {
      this.setState({
        books: nextProps.searchedbooks,
				isHasBookCanFind: nextProps.isHasBookCanFind,
			})
    }
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
  searchedbooks: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  isHasBookCanFind: PropTypes.bool.isRequired,
}

export default SearchBooks
