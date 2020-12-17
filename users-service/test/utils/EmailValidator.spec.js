const expect = require('chai').expect;
const emailValidator = require('../../app/utils/EmailValidator');

describe('Email validation',() => {
  it('Should email not to be valid',() => {
    const email = 'testmail.com';

    let isEmailValid = emailValidator.validate(email);
    expect(isEmailValid).to.false;
  });

  it('Should email be valid',() => {
    const email = 'test@mail.com';

    let isEmailValid = emailValidator.validate(email);
    expect(isEmailValid).to.true;
  });
});
