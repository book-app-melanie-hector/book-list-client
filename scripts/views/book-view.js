'use strict';

var app = app || {};

(function (module) {
  const bookView = {};


  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  };

  bookView.initDetailPage = (ctx) => {
    $('.container').hide();
    $('.detail-view').show();
    $('#book-details').empty();
    let template = Handlebars.compile($('#detail-view-template').text());
    $('#book-details').append(template(ctx));
  }


  bookView.initNewBookPage = () => {
    console.log('******');
    $('.container').hide();
    $('.new-book-form').show();
    $('#new-form').on('submit', bookView.submit);
    // {
    //   event.preventDefault();
    //   let book =  new app.Book({
    //     title: $('#book-title').val(),
    //     author: $('#book-author').val(),
    //     image_url: $('#book-image-url').val(),
    //     isbn: $('#book-isbn').val(),
    //     description: $('#book-description').val()
    //   })
    //   app.Book.create(book);
    // })
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
    app.Book.create(book);
    window.location = '../'
  }

  module.bookView = bookView;
}) (app)

// $(function() {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// })
