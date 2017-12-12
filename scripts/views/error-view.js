'use strict';

let errorView = {};

errorView.initErrorPage = err => {
  $('.container').hide();
  $('.error-view').show().replaceWith($('#error-message'));

  let template = Handlebars.compile($('#error-template').text());
  // .append(template(err)) ...not sure how to complete this
}
