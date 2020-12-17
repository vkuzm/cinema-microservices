const expect = require('chai').expect;
const sinon = require('sinon');
//var request = require("request");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisService = require('../../app/services/RedisService');
const redisClient = redisService.redisClient();
const loginController = require('../../app/controllers/LoginController');
const userModel = require('../../app/models/User');
const Response = require('../../app/models/Response');
const MessageConstants = require('../../app/MessageConstants');
const EmailPasswordInvalid = MessageConstants.EMAIL_PASSWORD_INVALID;

const flushPromises = () => new Promise(setImmediate);

const emailPasswordInvalidMessage = Response.error(
  EmailPasswordInvalid.code,
  EmailPasswordInvalid.message
);

describe('User login validation', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should email or password not to be valid', async () => {
    const req = {
      body: {}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    loginController.login(null)(req, res);
    await flushPromises();

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, emailPasswordInvalidMessage);
  });

  it('Should password not to be valid', async () => {
    const req = {
      body: {
        email: 'test@mail.com',
        password: ''
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    loginController.login(userModel)(req, res);
    await flushPromises();

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, emailPasswordInvalidMessage);
  });

  it('User not found in the database', async () => {
    const req = {
      body: {
        email: 'test@mail.com',
        password: '123123'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    sinon.mock(userModel)
    .expects('findOne')
    .callsFake(() => {
      return {
        lean(){
          return null;
        }
      };
    });

    loginController.login(userModel)(req, res);
    await flushPromises();

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, emailPasswordInvalidMessage);
  });

  it('User found in the database but password is not matched', async () => {
    const req = {
      body: {
        email: 'test@mail.com',
        password: '1111'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    const user = {
      userId: 1, 
      password: '3333'
    };
    
    sinon
      .mock(userModel)
      .expects('findOne')
      .callsFake(() => {
        return {
          lean() {
            return user;
          }
        };
      });

    sinon.mock(bcrypt)
    .expects('compareSync')
    .withArgs(req.body.password, user.password)
    .returns(false);

    loginController.login(userModel)(req, res);
    await flushPromises();

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, emailPasswordInvalidMessage);
  });

  it('User found in the database and password is matched', async () => {
    const req = {
      body: {
        email: 'test@mail.com',
        password: '1111'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    const user = {
      userId: 1,
      email: 'test@mail.com',
      password: '1111'
    };

    sinon
    .mock(userModel)
    .expects('findOne')
    .callsFake(() => {
      return {
        lean() {
          return user;
        }
      };
    });

    sinon.mock(bcrypt)
    .expects('compareSync')
    .withArgs(req.body.password, user.password)
    .returns(true);

    const token = '3123123132123';
    sinon.mock(jwt)
    .expects('sign')
    .returns(token);

    sinon.mock(redisClient)
    .expects('set')
    .withArgs(token, user.userId)
    .returns({
      userId: user.userId,
      token: token
    });

    loginController.login(userModel)(req, res);
    await flushPromises();

    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.send, {
      userId: user.userId,
      token: token
    });
  });

});
