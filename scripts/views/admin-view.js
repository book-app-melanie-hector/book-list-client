'use strict';

var app = app || {};

(function (module) {
  let adminView = {};

  // Shows admin login
  adminView.initAdminPage = () => {
    $('.container').hide();
    $('.admin-view').show();
  }

  adminView.verify = () => {
    if ($('#passphrase').val() === 12345) {
      $('.admin-only').show();
    }
  }
  module.adminView = adminView;
}) (app)
