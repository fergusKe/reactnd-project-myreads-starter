import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import ImageInput from './ImageInput'
import { randomString } from '../utils/helpers'

class CreateBook extends Component {
  static propTypes = {
    createBook: PropTypes.func.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    this.props.createBook({
      ...values,
      id: randomString(),
      authors: values.authors.split(','),
      shelf: 'wantToRead',
      imageLinks: { thumbnail: values.avatarURL }
    })
  }

  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' name='title' placeholder='Title'/>
            <input type='text' name='authors' placeholder='Authors'/>
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateBook
