'use strict';

var app = app || {};

(function (module) {
  const bookView = {};

  // Loads index page with view of all books
  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  };

  // Detailed view of selected book
  bookView.initDetailPage = (book) => {
    $('.container').hide();
    $('.detail-view').show();
    $('#book-details').empty();
    let template = Handlebars.compile($('#detail-view-template').text());
    $('#book-details').append(template(book.book));

    $('#update').on('click', function () {
      page(`/books/${$(this).data('id')}/update`)
      // app.Book.update(book);
    });

    $('#delete').on('click', function() {
      // event.preventDefault();
      app.Book.destroy($(this).data('id'));
    });
    // next();
  }

  // Shows form to create a new book
  bookView.initNewBookPage = () => {
    // console.log('******');
    $('.container').hide();
    $('.new-book-form').show();
    $('#new-form').on('submit', bookView.submit);
  }

  // Submit event function to extract values from form and send to Book.create function
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
  }

  bookView.initUpdateFormPage = (ctx) => { // this needs ctx to pre-populate form
    $('.container').hide();
    $('.update-view').show();
    $('#update-form input[name="title"]').val(ctx.book.title);
    $('#update-form input[name="author"]').val(ctx.book.author);
    $('#update-form input[name="image_url"]').val(ctx.book.image_url);
    $('#update-form input[name="isbn"]').val(ctx.book.isbn);
    $('#update-form textarea').val(ctx.book.description);

    $('#update-form').on('submit', function(event) {
      event.preventDefault();

      let book = new app.Book({
        book_id: ctx.book_id,
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value
      })
      app.Book.update(book);
    })
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


  module.bookView = bookView;
}) (app)

// $(function() {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// })
