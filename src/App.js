import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import CreateBook from './components/CreateBook'
import * as BooksAPI from './utils/BooksAPI'
import './stylesheet/App.scss'

class BooksApp extends React.Component {
  state = {
    books: [],
    modal: false,
    currentBook: {},
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('books', JSON.stringify(nextState.books))
  }


	componentDidMount() {
    const localStorageRef = localStorage.getItem('books')

    if (localStorageRef) {
      this.setState({
        books: JSON.parse(localStorageRef)
      })
    } else {
      BooksAPI
        .getAll()
        .then((books) => {
          this.setState({
            books
          })
        })
    }
	}

	changeShelf = (shelf, book) => {
    if (shelf === 'delete') {
      this.openModal(book)
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

  openModal = (book) => {
    this.setState({
      modal: true,
      currentBook: book
    })
  }

  closeModal = () => {
    this.setState({
      modal: false,
      currentBook: {}
    })
  }

  deleteBook = () => {
    this.setState((state) => ({
      books: state.books.filter((b) => b !== state.currentBook),
      modal: false,
      currentBook: {}
    }))
  }

  createBook = (book) => {
    this.setState(state => ({
      books: state.books.concat(book)
    }))
  }

  render() {
    const { books, modal } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            changeShelf={this.changeShelf}
            modal={modal}
            closeModal={this.closeModal}
            deleteBook={this.deleteBook}
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
