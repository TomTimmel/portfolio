
page('/projects.html?about', function(){
  console.log('about me test');
});
page('/projects.html', portfolioController.reveal);
page('/about', aboutController.reveal);

page();
