import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalDeleteBook = ({modal, deleteBook, closeModal}) => {
  return (
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
  )
}

ModalDeleteBook.propTypes = {
  modal: PropTypes.bool.isRequired,
  deleteBook: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalDeleteBook
