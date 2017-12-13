'use strict';

var app = app || {};

(function (module) {
  const bookView = {};


  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.map(book => $('#book-list').appent(book.toHtml()));
    }
  module.bookView = bookView;
}) (app)

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})
