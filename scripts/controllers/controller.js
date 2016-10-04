// (function(module){
  var portfolioController = {};

  portfolioController.reveal = function() {
    $('.tab-content').hide();
    $('#projects1').fadeIn();
  };

  var aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about').fadeIn();
  };

//   module.controller = controller;
// });(window);
