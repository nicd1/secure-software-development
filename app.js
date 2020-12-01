var express = require('express'),
  mustache = require('mustache-express'),
  path = require('path'),
  app = express(),
  Datastore = require('nedb');

app.engine('mustache', mustache());
app.use(express.urlencoded());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

app.get('/open', (req, res) => {
  res.render("opentickets")
})

app.get('/resolved', (req, res) => {
  res.render("resolvedtickets")
})

app.get('/closed', (req, res) => {
  res.render("closedtickets")
})

app.get('/login', (req, res) => {
  res.render("login")
})

app.get('/comments', (req, res) => {
  res.render("comments")
})

app.listen(app.get('port'), () => {
  console.log('Express started at port 3000, ctrl^c to stop')
})