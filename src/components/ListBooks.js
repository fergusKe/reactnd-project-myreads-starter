import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/fontawesome-free-solid'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import BooksContent from './BooksContent'
import '../stylesheet/modal.scss'

class ListBooks extends Component {
	static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
    modal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
  }

	render() {
    const { books, changeShelf, modal, closeModal, deleteBook } = this.props

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
        </div>

        <Modal isOpen={modal} toggle={closeModal} className='modal-test'>
          <ModalHeader toggle={closeModal}>Notice</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this book?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteBook}>Sure</Button>{' '}
            <Button color="secondary" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

				<BooksContent books={books} changeShelf={changeShelf} />
				<div className="open-search">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </div>
        <div className="open-cerate">
          <Link to="/create">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
			</div>
		)
	}
}

export default ListBooks
