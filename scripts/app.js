// 'use strict';

var portfolio = [];

function PortItem (opts) {
  this.title = opts.title;
  this.authors = opts.authors;
  this.webUrl = opts.webUrl;
  this.created = opts.created;
  this.image = opts.image;
}

PortItem.prototype.toHtml = function() {
  var source = $('#template').html();
  console.log(source);
  var template = Handlebars.compile(source);
  console.log(template);
  var html = template(this);
  console.log(html);
  return html;
  // var $newPortItem = $('div.template').clone();
  // $newPortItem.find('h1').text(this.title);
  // $newPortItem.find('h2').text(this.authors);
  // $newPortItem.find('a').attr('href', this.webUrl);
  // $newPortItem.find('time').text(this.created);
  // $newPortItem.removeClass('template');
  // return $newPortItem;
};

portData.forEach(function(ele){
  portfolio.push(new PortItem(ele));
});

portfolio.forEach(function(a){
  $('#portfolios').append(a.toHtml());
});

handleNav = function() {
  $('.nav').on('click', '.tab', function(event){
    event.preventDefault();
    $('.tab-content').hide();
    var $selectedTab = $(this).data('content');
    $('#' + $selectedTab).fadeIn();
  });
};

selectAbout = function() {
  $('.select').on('change', function(event){
    event.preventDefault();
    if($(this).val('#awa')) {
      $('#me').hide();
      $('#yester').hide();
    }
  });
};

handleNav();
selectAbout();
