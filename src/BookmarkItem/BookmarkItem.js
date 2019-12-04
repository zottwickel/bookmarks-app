import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';

export default function BookmarkItem(props) {
  const bookmarkPath = `/bookmark/${props.id}`
  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          onClick={() => props.onClickDelete(props.id)}
        >
          Delete
        </button>
        <button
          className='BookmarkItem__description'
        >
          <Link to={bookmarkPath}>Update</Link>
        </button>
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}
