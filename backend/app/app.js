const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { expressjwt } = require('express-jwt');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const routes = require('./routes/index');
const
  {
    JWT_SECRET, ALLOWED_PATHS, SESSION_SECRET, MONGO_URL,
  } = require('../config/const');
const { verifyJwt } = require('./utils/jwt');
const Users = require('./models/User');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: [
    'http://localhost:4200',
  ],
  credentials: true,
}));
app.use(morgan('common'));

app.use(session({
  secret: SESSION_SECRET,
  store: new MongoDBStore({
    uri: MONGO_URL,
    collection: 'mySessions',
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 500000,
  },
}));

app.use(
  expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({ path: ALLOWED_PATHS }),
);

app.use(async (req, res, next) => {
  if (ALLOWED_PATHS.includes(req.path)) {
    next();
  } else {
    const { id } = await verifyJwt(req.session.token);
    req.user = await Users.findById(id).lean();
    next();
  }
});

app.use('/api/v1', routes);

module.exports = app;
