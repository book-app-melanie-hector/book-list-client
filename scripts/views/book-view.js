'use strict';

var app = app || {};

(function (module) {
  const bookView = {};


  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  };

  bookView.initDetailPage = () => {
    $('.container').hide();
    $('.detail-view').show();
    app.Book.map(book => $('#book-details').append(book.toHtml()))
  }

  bookView.initNewBookPage = () => {
    $('.container').hide();
    $('.new-book-form').show();
    $('#new-form').on('submit', bookView.submit);
  }

  bookView.create = () => {
    $('#new-book').empty();

    let book = new app.Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      image_url: $('#book-image-url').val(),
      isbn: $('#book-isbn').val(),
      description: $('#book-description').val()
    })
    $('#new-book').append(book.toHtml());
  }

  bookView.submit = event => {
    event.preventDefault();
    let book = new app.Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      image_url: $('#book-image-url').val(),
      isbn: $('#book-isbn').val(),
      description: $('#book-description').val()
    })
  }

  module.bookView = bookView;
}) (app)

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})
