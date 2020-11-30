var express = require('express'),
  mustache = require('mustache-express'),
  path = require('path'),
  app = express();

app.engine('mustache', mustache());
app.use(express.urlencoded());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.render("home")
})

app.get('/login', (req, res) => {
  res.render("login")
})

app.listen(app.get('port'), () => {
  console.log('Express started at port 3000, ctrl^c to stop')
})