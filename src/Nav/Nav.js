import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <Link className='navLink' to='/'>Bookmarks List</Link>
      <Link className='navLink' to='/bookmark'>New Bookmark</Link>
    </nav>
  );
}
