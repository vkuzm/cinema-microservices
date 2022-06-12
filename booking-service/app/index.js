const keys = require('./keys');
const constants = require('./Constants');
const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const amqp = require('amqp-connection-manager');
const mongoose = require("mongoose");
const sessionController = require('./controllers/SessionController');

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

// RabbitMQ
var connection = amqp.connect([
  keys.rabbitMQ
]);

var channelWrapper = connection.createChannel({
  json: true,
  setup: function (channel) {
    return channel.assertQueue(constants.MESSAGE_QUEUE, { durable: false });
  }
});

channelWrapper.addSetup(function (channel) {
  return Promise.all([
    channel.consume(constants.MESSAGE_QUEUE, (msg) => {
      const { sessionId, movieId } = msg.content;

      if (sessionId && movieId) {
        console.log(msg.content);

        db("sessions")
        .insert({
          sessionId: sessionId,
          movieId: movieId
        })
        .catch((error) => {
          console.log('Error has occurred while inserting session into the database', error);
        });
      }
    }, { noAck: true, exclusive: false })
  ])
});


// Controllers
app.get('/sessions', sessionController.getSessions);
app.get('/sessions/:sessionId', sessionController.getSessionById);
app.post('/sessions', sessionController.addSession);
app.delete('/sessions/:sessionId', sessionController.removeSession);

// Run server
app.listen(keys.serverPort, () => {
  console.log(`Listening on port ${keys.serverPort}`);
});
