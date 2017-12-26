import React from 'react'
import { Route } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { AnimatedSwitch } from 'react-router-transition'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import CreateBook from './components/CreateBook'
import ShowBook from './components/ShowBook'
import FakeLoader from './components/FakeLoader/FakeLoader'
import * as BooksAPI from './utils/BooksAPI'
import 'bootstrap/dist/css/bootstrap.css'
import './stylesheet/App.scss'
import './stylesheet/router-transition.scss'

class BooksApp extends React.Component {
  state = {
    books: [],
    modal: false,
    loading: true,
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
      this.initBooks()
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

  initBooks = () => {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  render() {
    const { books, modal, loading } = this.state

    return (
      <div className="app">
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route exact path="/" render={() => (
            <ListBooks
              books={books}
              changeShelf={this.changeShelf}
              initBooks={this.initBooks}
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
          <Route path="/books/:id" render={({ match }) => (
            <ShowBook
              books={books}
              match={match}
            />
          )} />
        </AnimatedSwitch>
        <FakeLoader spinner="spinner6" loading={loading} />
        <Modal isOpen={modal} toggle={this.closeModal} className='modal-test'>
          <ModalHeader toggle={this.closeModal}>Notice</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this book?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteBook}>Sure</Button>{' '}
            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default BooksApp
