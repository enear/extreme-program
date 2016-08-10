var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  MongoStore = require('connect-mongo/es5')(session),
  morgan = require('morgan'),
  flash = require('connect-flash'),
  passport = require('passport'),

  users = require('./api/users/userRoutes'),
  roles = require('./api/roles/roleRouter'),
  rewards = require('./api/rewards/rewardRouter'),
  goals = require('./api/goals/goalRouter'),
  requestStates = require('./api/requestsStates/requestStateRouter'),
  settings = require('./api/settings/settingsRouter'),

  index = require('./routes/index'),
  admin = require('./routes/admin'),
  auth = require('./routes/auth'),

  UserModel = require('./api/users/userModel');

  app = express();

require('./config.js');
require('./api/users/userInitializer');
require('./api/roles/roleInitializer');
require('./api/rewards/rewardInitializer');
require('./api/goals/goalInitializer');
require('./api/requestsStates/requestsStatesInitializer');
require('./api/settings/settingsInitializer');

require('./api/lib/lib').auth(passport, UserModel);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.set('views', path.join(__dirname, 'app/public/views'));
// override this setting to choose the view engine to be used
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('app/public'));

//sessions
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
app.use('/', index);
app.use('/auth', auth);
app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/rewards', rewards);
app.use('/api/goals', goals);
app.use('/api/requeststates', requestStates);
app.use('/api/settings', settings);
app.use('/admin', admin);
app.use('/login', require('./routes/login')(passport));
app.use('/signin', require('./routes/signin')(passport, UserModel));

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    console.log(req.url);
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});
app.listen(process.env.PORT_NUMBER, function () {
  console.log("listening to " + process.env.PORT_NUMBER);
});


module.exports = app;
