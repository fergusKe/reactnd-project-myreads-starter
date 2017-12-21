import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import CreateBook from './components/CreateBook'
import * as BooksAPI from './utils/BooksAPI'
import './stylesheet/App.css'

class BooksApp extends React.Component {
  state = {
    books: []
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
    if (shelf === 'delete') {
      // this.toggle()
    } else if (shelf !== book.shelf && shelf !== 'none') {
			const books = this.state.books.map((b) => {
				if (b === book) {
					b.shelf = shelf
				}
				return b
			})

			this.setState({ books })
		}
  }

  createBook = (book) => {
    this.setState(state => ({
      books: state.books.concat(book)
    }))
  }

  // toggle = () => {
  //   console.log('handleModal')
  //   this.setState({
  //     modal: !this.state.modal
  //   })
  // }

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
          <SearchBooks
            books={books}
            changeShelf={this.changeShelf}
          />
        )} />
        <Route path="/create" render={({ history }) => (
          <CreateBook
            createBook={(book) => {
              this.createBook(book)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
