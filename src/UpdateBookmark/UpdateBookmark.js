import React, { Component } from  'react';
import { Redirect } from 'react-router-dom';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import './UpdateBookmark.css';

const Required = () => (
  <span className='UpdateBookmark__required'>*</span>
)

class UpdateBookmark extends Component {  
  state = {
    error: null,
    redirect: false,
  };

  static contextType = BookmarksContext

  onClickCancel = e => {
    e.preventDefault()
    this.setState({ redirect: true })
  }

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    const apiEndpoint = config.API_ENDPOINT + '/' + this.props.match.params.id
    this.setState({ error: null })
    fetch(apiEndpoint, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res
      })
      .then(fetch(config.API_ENDPOINT, {
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
        .then(this.context.setBookmarks)
        .then(
          this.setState({
            redirect: true
          })
        )
        .catch(error => {this.setState({ error })})
      )
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    const { error } = this.state
    const id = this.props.match.params.id
    if (this.context.bookmarks[0]) {
      const thisBookmark = this.context.bookmarks.filter(bookmark => {
        return bookmark.id === parseInt(id)
      })[0]
      return (
        <section className='UpdateBookmark'>
          <h2>Update {thisBookmark.title}</h2>
          <form
            className='UpdateBookmark__form'
            onSubmit={this.handleSubmit}
          >
            <div className='UpdateBookmark__error' role='alert'>
              {error && <p>{error.message}</p>}
            </div>
            <div>
              <label htmlFor='title'>
                Title
                {' '}
                <Required />
              </label>
              <input
                type='text'
                name='title'
                id='title'
                defaultValue={thisBookmark.title}
                required
              />
            </div>
            <div>
              <label htmlFor='url'>
                URL
                {' '}
                <Required />
              </label>
              <input
                type='url'
                name='url'
                id='url'
                defaultValue={thisBookmark.url}
                required
              />
            </div>
            <div>
              <label htmlFor='description'>
                Description
              </label>
              <textarea
                name='description'
                id='description'
                defaultValue={thisBookmark.description}
              />
            </div>
            <div>
              <label htmlFor='rating'>
                Rating
                {' '}
                <Required />
              </label>
              <input
                type='number'
                name='rating'
                id='rating'
                defaultValue={thisBookmark.rating}
                min='1'
                max='5'
                required
              />
            </div>
            <div className='UpdateBookmark__buttons'>
              <button type='button' onClick={e => this.onClickCancel(e)}>
                Cancel
              </button>
              {' '}
              <button type='submit'>
                Save
              </button>
            </div>
          </form>
        </section>
      );
    } else {
      return (
        <div>
          <h2>Loading</h2>
        </div>
      )
    }
  }
}

export default UpdateBookmark;