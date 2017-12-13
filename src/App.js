import React from 'react'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
		books: [],
    showSearchPage: false
	}
	
	componentDidMount() {
		BooksAPI
			.getAll()
			.then((books) => {
				this.setState({
					books
				})
			})
	}

	changeShelf = (shelf, book) => {
		if (shelf !== book.shelf && shelf !== 'none') {
			const books = this.state.books.map((b) => {
				if (b === book) {
					b.shelf = shelf
				}
				return b
			})

			this.setState({ books })
		}
	}
	
  render() {
		const { books } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
					<ListBooks
						books={books}
						changeShelf={this.changeShelf}
					/>
        )}
      </div>
    )
  }
}

export default BooksApp
