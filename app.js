var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  index = require('./routes/index'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  app = express();

require('./config.js');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.set('views', path.join(__dirname, 'public/views'));
// override this setting to choose the view engine to be used
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/', index);

app.listen(process.env.PORT_NUMBER, function () {
  console.log("listening to " + process.env.PORT_NUMBER);
});
