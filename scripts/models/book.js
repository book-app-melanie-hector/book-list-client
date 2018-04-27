'use strict';
//change to IIFE
var app = app || {};

const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://md-hn-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;
// var __API_URL__ = 'http://localhost:3000';
// var __API_URL__ = 'https://md-hn-booklist.herokuapp.com/';// for deployed testing

(function (module) {
  function errorCallBack(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }
  // Constructor to iterate through each book in an array
  function Book(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  // Establish array to be filled with books
  Book.all=[];

  // Prototype method to compile book information and post to DOM
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  // Load books into Book.all array, arrange by title name
  Book.loadAll = rows => {
    Book.all = rows.sort((a,b) => b.title - a.title).map(bookObj => new Book(bookObj));
  };

  // Gets books from database, then calls loadAll function
  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallBack);
  };

  // Gets information from database for a specific book
  Book.fetchOne = (ctx, callback) => {
    // console.log('ctx', ctx);
    app.adminView.verify();
    $.get(`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallBack);
  }

  // Creates a new book in the database then brings the user back to the home page
  Book.create = book => {
    // console.log('create a new book')
    $.post(`${ENV.apiUrl}/api/v1/books`, book)
      .then(console.log)
      .then(() => page('/'))
      .catch(errorCallBack);
  }

  // Deletes a specific book and communicates with server.js to delete from database
  Book.destroy = (id) => {
    $.ajax({
      url: `${ENV.apiUrl}/api/v1/books/${id}`,
      method: 'DELETE'
    })
      .then(() => page('/'))
      .catch(errorCallBack);
  }

  // Updates a specific book to the database
  Book.update = (book, bookId) => {
    // console.log('Book.update', book);
    $.ajax({
      url: `${ENV.apiUrl}/api/v1/books/${bookId}`,
      method: 'PUT',
      data: book,
    })
      .then(() => page(`/books/${bookId}`)) // redirect
      .catch(errorCallBack); //catch
  }

  Book.find = (book, callback) => {
    $.get(`${ENV.apiUrl}/api/v1/books/find`, book)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallBack)
  };

  Book.findOne = isbn => {
    $.get(`${ENV.apiUrl}/api/v1/books/find/${isbn}`)
      .then(Book.create)
      .catch(errorCallBack)
  };

  module.Book = Book;
}) (app)
