var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  index = require('./routes/index'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),

  users = require('./api/users/userRoutes'),
  roles = require('./api/roles/roleRouter'),
  rewards = require('./api/rewards/rewardRouter'),
  goals = require('./api/goals/goalRouter'),

  admin = require('./routes/admin'),
  login = require('./routes/login'),
  app = express();

require('./config.js');
require('./api/users/userInitializer');
require('./api/roles/roleInitializer');
require('./api/rewards/rewardInitializer');
require('./api/goals/goalInitializer');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.set('views', path.join(__dirname, 'app/public/views'));
// override this setting to choose the view engine to be used
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('app/public'));

//routes
app.use('/', index);
app.use('/auth', login);
app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/rewards', rewards);
app.use('/api/goals', goals);
app.use('/admin', admin);

app.listen(process.env.PORT_NUMBER, function () {
  console.log("listening to " + process.env.PORT_NUMBER);
});


module.exports = app;
