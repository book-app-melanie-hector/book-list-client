'use strict';

page('/books/new', ctx => app.bookView.initNewBookPage(ctx));
page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
console.log('app ', app );

page();
