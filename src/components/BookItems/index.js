import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const BookItems = props => {
  const {booksItemDetail} = props
  const {title, readStatus, rating, authorName, coverPic, id} = booksItemDetail

  return (
    <li className="bookItem">
      <Link className="nav-link" to={`/books/${id}`}>
        <img className="book-Item-coverpic" src={coverPic} alt={title} />
        <div className="book-details">
          <h1 className="title-book">{title}</h1>
          <p className="author-book">{authorName}</p>
          <div className="rating-cont">
            <p className="avg-rating">Avg Rating </p>
            <BsFillStarFill className="star" />
            <p className="rating">{rating}</p>
          </div>
          <p className="avg-rating">
            Status: <span className="readStatus">{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default BookItems
