'use strict';

function Book(obj) {
  Object.keys(obj).forEach(key => this.[key] = obj[key]);
};

let Book.all=[];

let Book.toHtml = function() {
  let template = Handlebars.compile($('book-list-template').text());

  return template('this');
};

let Book.loadAll = rows => {
  rows.sort((a,b) => b.title - a.title);
  Book.all = rows.map(bookObj => new Book(bookObj));
};

let Book.fetchAll = callBack => {
  $.get('/api/v1/books')
    .then(results => {
      Book.loadAll(results);
    })
    .catch(error => errorCallBack(error));
};
