// 'use strict';
(function(module) {

  var getDate = function(){
    var date = new Date().toISOString().split('T', 1);
    var date1 = date[0];
    document.getElementById('end').setAttribute('value', date1);
  };
  getDate();

  PortItem.all = [];

  function PortItem (opts) {
    this.title = opts.title;
    this.authors = opts.authors;
    this.webUrl = opts.webUrl;
    this.created = opts.created;
    this.image = opts.image;
    this.description = opts.description;
    this.gitUrl = opts.gitUrl;
  }

  // function to initiate template, this function is call in PortItem.prepareData

  PortItem.prototype.toHtml = function() {
    var source = $('#template').html();
    var template = Handlebars.compile(source);
    var html = template(this);
    return html;
  };

  // function to push the data to the array of objects and append to the template in projects.html.  Also, the click-handler including callback function is included here. Can I/ should I move it?
  PortItem.prepareData = function(data) {
    data.forEach(function(ele){
      PortItem.all.push(new PortItem(ele));
    });
    // console.log('PortItem', PortItem.all);
    $('.date-range').on('change', function(event){
      event.preventDefault();
      var stats = PortItem.all.map(function(obj){
        // console.log(obj.created, 'obj.created');
        return obj.created;
      }).reduce(function(acc, curr){
        if(curr > $('#start').val() && curr < $('#end').val()){
          acc[curr] = true;
          // console.log(acc);
        }
        return acc;
      }, {});
      var ranged = PortItem.all.filter(function(obj){
        return stats[obj.created];
      });
      // console.log(ranged, 'ranged');
      $('.main-projects').hide();
      ranged.forEach(function(obj){
        $('[data-created="' + obj.created + '"]').fadeIn();
      });
    });
    var gitHubAddress = function(){
      var descriptor = PortItem.all.map(function(obj){
        console.log('obj.description: ', obj.description);
        return obj.description;
      }).reduce(function(acc,curr){
        acc[curr] = true;
        return acc;
      }, {});
      console.log('descriptor: ', descriptor);

      reposObj.all.forEach(function(element){
        for (var i = 0; i < PortItem.all.length; i++){
          if(PortItem.all[i].description === element.description){
            PortItem.all[i].gitUrl = element.git_url;
          }
        }
      });
      console.log('PortItem: ', PortItem.all);
    };
    gitHubAddress();

    PortItem.all.forEach(function(a){
      $('#portfolios').append(a.toHtml());
    });
  };
  // Click-handler function for main nav to toggle between the project section and about section...
  // handleNav = function() {
  //   $('.nav').on('click', '.tab', function(event){
  //     event.preventDefault();
  //     $('.tab-content').hide();
  //     var $selectedTab = $(this).data('content');
  //     $('#' + $selectedTab).fadeIn();
  //   });
  // };

  //function to either retrieve data from local storage or from port.json.
  PortItem.fetchAll = function(){
    if(localStorage.port){
      // $.ajax({
      //   type: 'HEAD',
      //   url: 'port.json',
      //   success: function(data, message, xhr) {
      //     var eTag = xhr.getResponseHeader('eTag');
      //     if (!localStorage.eTag || eTag !== localStorage.eTag) {
      //       localStorage.eTag = eTag;
      //     }
      //
      //   }
      // });
      var getData = localStorage.getItem('port');
      var parseData = JSON.parse(getData);
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

  // if the data successfully loads, put it into local storage.
  function successHandler(data){
    var portData1 = JSON.stringify(data);
    localStorage.setItem('port', portData1);
    // var portData2 = JSON.parse(data);
    // console.log(portData2, typeof portData2);

    var stall = function(){
      PortItem.prepareData(data);
    };
    reposObj.requestPushRepos(stall);
  }

  function errorHandler(error){
    alert('The data was unable to load');
  }

  //Click-handler to select the section of the About Me section to display..
  selectAbout = function() {
    $('.select').on('change', function(event){
      event.preventDefault();
      if($(this).val() === 'Alaska Wildland Adventures') {
        $('.about-me').hide();
        $('#awa').fadeIn('fast');
      }
      else if ($(this).val() === 'Yestermorrow') {
        $('.about-me').hide();
        $('#yester').fadeIn('fast');
      }
      else if ($(this).val() === 'About Me'){
        $('.about-me').hide();
        $('#about1').fadeIn('fast');
      }
      else {
        $('.about-me').hide();
        $('.about-me').fadeIn('fast');
      }
    });
  };

  // handleNav();
  selectAbout();
  PortItem.fetchAll();

  // if(window.location.href === 'http://127.0.0.1:8080/projects.html?about'){
  // //   $('#projects1').hide();
  // // }
})(window);
