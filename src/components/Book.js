import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { book, changeShelf } = this.props
    // console.log('book = ', book);

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
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {
              book.authors.map((name) => (
                <span key={name} className="name">{name}</span>
              ))
            }
          </div>
        </div>
      </li>
    )
  }
}

export default Book