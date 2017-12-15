'use strict';

var app = app || {};
// var __API_URL__ = 'http://localhost:3000';
var __API_URL__ = 'https://md-hn-booklist.herokuapp.com/';// for deployed testing

(function (module) {
  let adminView = {};

  // Shows admin login
  adminView.initAdminPage = () => {
    $('.container').hide();
    $('.admin-view').show();

    $('#admin-form').on('submit', event => {
      event.preventDefault();
      let token = event.target.passphrase.value;
      localStorage.token = token;

      $.get(`${__API_URL__}/api/v1/admin`, {token})
        .then(response => {
          if (response) console.log('token')
          else console.log('no token');
          page('/');
        })
        .then(() => page('/'));
    })
  }

  adminView.verify = (ctx) => {
    // if (!localStorage.token) $('.admin').addClass('admin-only');
    // else $('.admin').show();
    $('.admin').show();
  }
  module.adminView = adminView;
}) (app)
