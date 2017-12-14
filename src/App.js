import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
		books: [],
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
        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            changeShelf={this.changeShelf}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
