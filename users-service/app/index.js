const keys = require('./keys');
const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const userModel = require("./models/User");
const userController = require('./controllers/UserController');
const loginController = require('./controllers/LoginController');
const registerController = require('./controllers/RegisterController');
const logoutController = require('./controllers/LogoutController');
const authController = require('./controllers/AuthController');
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
app.get('/', userController.getUsers(userModel));
app.get('/:userId', userController.getUser(userModel));
app.put('/edit', auth.requireAuth, userController.editUser(userModel));
app.post('/login', loginController.login(userModel));
app.post('/register', registerController.register(userModel));
app.post('/logout', auth.requireAuth, logoutController.logOut());
app.post('/auth', authController.auth(userModel));

// Run server
app.listen(keys.serverPort, () => {
  console.log(`Listening on port ${keys.serverPort}`);
});
