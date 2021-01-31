const keys = require('./keys');
const constants = require('./Constants');
const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const amqp = require('amqp-connection-manager');
const knex = require('knex');
const sessionController = require('./controllers/SessionController');

// Setup app
const corsOptions = {
  origin: '*'
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParse.json());

// Postgress
const db = knex({
	client: 'pg',
	connection: keys.postgressURI
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
app.get('/sessions', sessionController.getSessions(db));


// Run server
app.listen(keys.serverPort, () => {
  console.log(`Listening on port ${keys.serverPort}`);
});
