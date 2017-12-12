'use strict';

let bookView = {};

let bookView.initIndexPage = () => {
  $('.container').hide();
  $('.book-view').show();
  Book.all.map(author => {
    return {
      author: author,
      title: title
    }
  }).append(author.toHtml()); //this may need to be corrected
}
