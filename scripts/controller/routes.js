'use strict';

if(window.location.pathname !== '/') {
  page.base('/book-list-client');
}

page('/books/new', ctx => app.bookView.initNewBookPage(ctx));
page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/books/:book_id/update',
  (ctx, next) => app.Book.fetchOne(ctx, next),
  ctx => app.bookView.initUpdateFormPage(ctx));
page();
