import React from 'react'

const BookmarksContext = React.createContext({
  bookmarks: [],
  setBookmarks: () => {}
})

export default BookmarksContext