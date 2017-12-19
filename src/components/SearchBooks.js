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
      const field = ['title', 'authors']
      const match = new RegExp(escapeRegExp(query), 'i')

      showingBooks = books.filter((book) => {
        let isMatch = false
        field.forEach((f) => {
          if (match.test(book[f])) {
            isMatch = true
          }
        })

        return isMatch
      }).map((book) => {
        // let regex = new RegExp(query, 'i')
        // let match = book['title'].match(regex)
        // console.log('match = ', match)

        // if (match) {
        //   let title = book['title'].replace(regex, `<span className="highlight">${match[0]}</span>`)
        //   return {
        //     ...book,
        //     title
        //   }
        // }

        // const field = ['title', 'authors']
        // field.forEach((f) => {
        //   let regex = new RegExp(query, 'i')
        //   console.log('book[f] = ', book[f])
        //   if (book[f] instanceof Array) {

        //   }
        //   let match = book[f].match(regex)
        //   console.log('book[f] = ', book[f])
        // })

        return book
      })
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('title'))

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />

					</div>
        </div>
        <div className="search-books-results">
          <BooksContent books={showingBooks} query={query} changeShelf={changeShelf} />
				</div>
			</div>
		)
	}
}

export default SearchBooks
