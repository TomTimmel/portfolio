
var reposObj = {};

reposObj.all = [];

reposObj.requestPushRepos = function(stall){
  $.ajax({
    url: 'https://api.github.com/users/TomTimmel/repos',
    success: function(data){
      // console.log('data: ', data);
      reposObj.all = data;
      stall();
      console.log('object: ', reposObj.all);
    },
    error: function(error){
      console.log('err: ', error);
    }
  });
};
