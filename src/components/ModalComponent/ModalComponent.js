import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalDeleteBook from './ModalDeleteBook'
import ModalSameBook from './ModalSameBook'

class ModalComponent extends Component {
  render() {
    const { modal, modalType, deleteBook, closeModal } = this.props

    return (
      <div>
        {
          modalType === 'deleteBook' && (
            <ModalDeleteBook
              modal={modal}
              deleteBook={deleteBook}
              closeModal={closeModal}
            />
          )
        }
        {
          modalType === 'sameBook' && (
            <ModalSameBook
              modal={modal}
              closeModal={closeModal}
            />
          )
        }
      </div>
    )
  }
}

ModalComponent.propTypes = {
  modal: PropTypes.bool.isRequired,
  deleteBook: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalComponent
