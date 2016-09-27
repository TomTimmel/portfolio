// 'use strict';

PortItem.all = [];

function PortItem (opts) {
  this.title = opts.title;
  this.authors = opts.authors;
  this.webUrl = opts.webUrl;
  this.created = opts.created;
  this.image = opts.image;
}

PortItem.prototype.toHtml = function() {
  var source = $('#template').html();
  // console.log(source);
  var template = Handlebars.compile(source);
  // console.log(template);
  var html = template(this);
  // console.log(html);
  return html;
  // var $newPortItem = $('div.template').clone();
  // $newPortItem.find('h1').text(this.title);
  // $newPortItem.find('h2').text(this.authors);
  // $newPortItem.find('a').attr('href', this.webUrl);
  // $newPortItem.find('time').text(this.created);
  // $newPortItem.removeClass('template');
  // return $newPortItem;
};

PortItem.prepareData = function(data) {
  // console.log(data, typeof data);
  data.forEach(function(ele){
    PortItem.all.push(new PortItem(ele));
  });

  PortItem.all.forEach(function(a){
    $('#portfolios').append(a.toHtml());
  });
};

handleNav = function() {
  $('.nav').on('click', '.tab', function(event){
    event.preventDefault();
    $('.tab-content').hide();
    var $selectedTab = $(this).data('content');
    $('#' + $selectedTab).fadeIn();
  });
};

PortItem.fetchAll = function(){
  if(localStorage.port){
    var getData = localStorage.getItem('port');
    // console.log(getData, typeof getData);
    var parseData = JSON.parse(getData);
    // console.log(parseData, typeof parseData);
    PortItem.prepareData(parseData);
  }
  else {
    $.ajax('port.json', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
  }
};

function successHandler(data){
  var portData1 = JSON.stringify(data);
  localStorage.setItem('port', portData1);
  // var portData2 = JSON.parse(data);
  // console.log(portData2, typeof portData2);
  PortItem.prepareData(data);
}

function errorHandler(error){
  alert('The data was unable to load');
}

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
PortItem.fetchAll();
