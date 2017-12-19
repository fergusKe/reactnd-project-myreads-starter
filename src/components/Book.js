import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Highlighter from 'react-highlight-words'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { book, query, changeShelf } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => changeShelf(e.target.value, book)} >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={book.title}
            />
          </div>
          <div className="book-authors">
            {
              book.authors.map((name) => (
                <Highlighter
                  key={name}
                  className="name"
                  searchWords={[query]}
                  autoEscape={true}
                  textToHighlight={name}
                />
              ))
            }
          </div>
        </div>
      </li>
    )
  }
}

export default Book
