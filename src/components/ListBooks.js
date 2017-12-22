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
  }

  state = {
    model: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

	render() {
    const { books, changeShelf } = this.props

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
        </div>

        <Button color="danger" onClick={this.toggle}>Modal</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-test'>
          <ModalHeader toggle={this.toggle}>Notice</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this book?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Sure</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
