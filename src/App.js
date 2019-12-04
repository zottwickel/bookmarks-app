import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import UpdateBookmark from './UpdateBookmark/UpdateBookmark'
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
    setBookmarks: bookmarks => {
      this.setState({
        bookmarks,
        error: null,
      })
    },
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          <BookmarksContext.Provider value={this.state} > 
            <Switch>
              <Route exact path='/bookmark'>
                <AddBookmark onAddBookmark={this.addBookmark}/>
              </Route>
              <Route exact path='/'>
                <BookmarkList />
              </Route>
              <Route 
                path='/bookmark/:id'
                render={(props) => {
                  return <UpdateBookmark {...props} />
                }}
              />
            </Switch>
          </BookmarksContext.Provider> 
        </div>
      </main>
    );
  }
}

export default App;
