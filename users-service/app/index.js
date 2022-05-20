const keys = require('./keys');
const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const userController = require('./controllers/UserController');
const loginController = require('./controllers/LoginController');
const registerController = require('./controllers/RegisterController');
const logoutController = require('./controllers/LogoutController');
const authController = require('./controllers/AuthController');
const favoriteController = require('./controllers/FavoriteController');
const auth = require('./services/AuthorizationService');

// Setup app
const corsOptions = {
  origin: '*'
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParse.json());

// MongoDB
mongoose.connect(keys.mongoURI, {
  dbName: 'users',
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// Controllers
app.get('/', userController.getUsers);
app.get('/:userId', userController.getUser);
app.put('/edit', auth.requireAuth, userController.editUser);
app.post('/login', loginController.login);
app.post('/register', registerController.register);
app.post('/logout', auth.requireAuth, logoutController.logOut);
app.post('/auth', authController.auth);
app.post('/favorites', auth.requireAuth, favoriteController.getFavorites);
app.post('/favorites/change', auth.requireAuth, favoriteController.favoriteChange);
app.post('/favorites/status', auth.requireAuth, favoriteController.favoriteStatus);

// Run server
app.listen(keys.serverPort, () => {
  console.log(`Listening on port ${keys.serverPort}`);
});
