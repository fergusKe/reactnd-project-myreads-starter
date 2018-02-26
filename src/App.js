import React from 'react'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'

import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import CreateBook from './components/CreateBook'
import ShowBook from './components/ShowBook'
import FakeLoader from './components/FakeLoader/FakeLoader'
import ModalComponent from './components/ModalComponent/ModalComponent'

import * as BooksAPI from './utils/BooksAPI'
import { preloadImage } from './utils/helpers'
import 'bootstrap/dist/css/bootstrap.css'
import './stylesheet/App.scss'
import './stylesheet/router-transition.scss'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedbooks: [],
    modal: false,
    modalType: 'deleteBook',
    loading: true,
    currentBook: {},
    isHasBookCanFind: true,
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('books', JSON.stringify(nextState.books))
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}

	componentDidMount() {
    const localStorageRef = localStorage.getItem('books')
    const books = JSON.parse(localStorageRef)

    if (books) {
      preloadImage(books, {
        all: () => {
          this.setState({
            books
          })
          this.closeLoading()
        }
      })
    } else {
      this.initBooks()
    }

    // trigger scroll event
    const event = new Event('scroll')
    window.dispatchEvent(event)
	}

	changeShelf = (shelf, selectedBook) => {
    console.log('books = ', this.state.books)
    console.log('shelf = ', shelf)
    console.log('selectedBook = ', selectedBook)

    if (selectedBook.shelf === undefined) {
      // searching book add to shelf
      selectedBook = {
        ...selectedBook,
        shelf
      }

      const isHasBook = this.state.books.find((book) => {
        return book.id === selectedBook.id
      })

      if (isHasBook) {
        this.openModal(selectedBook, 'sameBook')
      } else {
        this.setState({
          books: [
            ...this.state.books,
            selectedBook
          ]
        })
      }
    } else {
      // change shelf
      if (shelf === 'delete') {
        this.openModal(selectedBook, 'deleteBook')
      } else if (shelf !== selectedBook.shelf) {
        const books = this.state.books.map((book) => {
          if (book === selectedBook) {
            return {
              ...book,
              shelf
            }
          }

          return book
        })

        this.setState({ books })
      }
    }
  }

  openModal = (book, modalType) => {
    this.setState({
      modal: true,
      currentBook: book,
      modalType,
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
    this.openLoading()

    BooksAPI
      .getAll()
      .then((books) => {
        preloadImage(books, {
          all: () => {
            this.setState({
              books
            })
            this.closeLoading()
          }
        })
      })
  }

  searchingBooks = (query) => {
    if (query) {
      BooksAPI
        .search(query)
        .then((searchedbooks) => {
          if (searchedbooks instanceof Array) {
            this.setState({
              searchedbooks,
              isHasBookCanFind: true
            })
          } else {
            this.setState({
              searchedbooks: [],
              isHasBookCanFind: false
            })
          }
        })
    } else {
      this.setState({
        searchedbooks: [],
        isHasBookCanFind: true
      })
    }
  }

  openLoading = () => {
    this.setState({
      loading: true
    })
  }

  closeLoading = () => {
    this.setState({
      loading: false
    })
  }

  onScroll = () => {
    const itemsEle = document.getElementsByClassName("book")
		const winBottom = window.scrollY + window.innerHeight

		// Add class when scroll to the top of the book
		for (let i = 0; i < itemsEle.length; i += 1) {
			const item = itemsEle[i]
			const offsetTop = item.offsetTop

			if (offsetTop < winBottom) {
				item.classList.add('active')
			}
		}
  }

  render() {
    const {
      books,
      searchedbooks,
      isHasBookCanFind,
      modal,
      modalType,
      loading
    } = this.state

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
              searchedbooks={searchedbooks}
              searchingBooks={this.searchingBooks}
              changeShelf={this.changeShelf}
              isHasBookCanFind={isHasBookCanFind}
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
              match={match}
              books={books}
              searchedbooks={searchedbooks}
            />
          )} />
        </AnimatedSwitch>
        <FakeLoader spinner="spinner6" loading={loading} />
        <ModalComponent
          modal={modal}
          modalType={modalType}
          deleteBook={this.deleteBook}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}

export default BooksApp
