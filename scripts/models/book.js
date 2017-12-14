'use strict';
//change to IIFE
var app = app || {};
var __API_URL__ = 'http://localhost:3000';
// var __API_URL__ = 'https://md-hn-booklist.herokuapp.com/';// for deployed testing

(function (module) {
  function errorCallBack(err) {
    console.error(err);;
    module.errorView.initErrorPage(err);
  }

  function Book(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  };

  Book.all=[];

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  // Book.prototype.detailToHTML() = function() {
  //   let template = Handlebars.compile($('#detail-view-template').text());
  //   return template(this);
  // }

  Book.loadAll = rows => {
    rows.sort((a,b) => b.title - a.title);
    Book.all = rows.map(bookObj => new Book(bookObj));
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(data => Book.loadAll(data))
      .then(callback)
      .catch(errorCallBack);
  };

  Book.fetchOne = (ctx, callback) => {
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallBack);
  }

  Book.create = book => {
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .catch(errorCallBack);
  }

  // Book.prototype.insertRecord = function(callback) {
  //   $.post('/books/new', {title: this.title, author: this.author, image_url: this.image_url, isbn: this.isbn, description: this.description})
  //     .then(console.log)
  //     .then(callback);
  // }

  module.Book = Book;
}) (app)
