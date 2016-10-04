
var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

app.use(express.static('./'));
app.get('projects.html', function(){
  response.json({message: 'what is happening'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
