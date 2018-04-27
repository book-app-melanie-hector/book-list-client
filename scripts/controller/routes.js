'use strict';

// if(window.location.pathname !== '/') {
//   page.base('/book-list-client');
// }

page('/',
  (ctx, next) => app.Book.fetchAll(() => app.bookView.initIndexPage(ctx, next)),
  (ctx, next) => app.adminView.verify(ctx, next)
);
page('/books/new',
  ctx => app.bookView.initNewBookPage(ctx)
);
page('/books/search',
  ctx => app.bookView.initSearchFormPage()
);
page('/books/:book_id/update',
  (ctx, next) => app.Book.fetchOne(ctx, next),
  ctx => app.bookView.initUpdateFormPage(ctx)
);
page('/books/:book_id',
  (ctx) => app.Book.fetchOne(ctx, () => app.bookView.initDetailPage(ctx))
);
// page('/books/:book_id/update',
//   (ctx, next) => app.Book.fetchOne(ctx, next),
// );

page('/admin',
  () => app.adminView.initAdminPage()
);
page();
