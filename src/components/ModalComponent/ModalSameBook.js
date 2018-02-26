import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalSameBook = ({modal, closeModal}) => {
  return (
    <Modal isOpen={modal} toggle={closeModal} className='modal-test'>
      <ModalHeader toggle={closeModal}>Notice</ModalHeader>
      <ModalBody>
        You have the same book.
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

ModalSameBook.propTypes = {
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalSameBook
