'use strict';

page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage))// needs to be completed
page('/books/new', ctx => app.bookView.initNewBookPage)// needs to be completed
