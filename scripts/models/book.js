'use strict';
//change to IIFE
var app = app || {};
var __API_URL__ = 'http://localhost:3000';

(function (module) {
  function errorCallBack(err) {
    console.error(err);;
    module.errorView.initErrorPage(err);
  }

  function Book(obj) {
    Object.keys(obj).forEach(key => this.[key] = obj[key]);
  };

  Book.all=[];

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('book-list-template').text());
    return template(this);
  };

  Book.loadAll = rows => {
    rows.sort((a,b) => b.title - a.title);
    Book.all = rows.map(bookObj => new Book(bookObj));
  };

  Book.fetchAll = callBack => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(data => Book.loadAll(data))
      .then(callback)
      .catch(errorCallBack);
  };
  module.Book = Book;
}) (app)
