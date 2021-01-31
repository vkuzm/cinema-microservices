class UserDto {
  constructor() {}

  set userId(value) {
    this._userId = value;
  }

  set name(value) {
    this._name = value;
  }

  set email(value) {
    this._email = value;
  }

  set age(value) {
    this._age = value;
  }

  set joined(value) {
    this._joined = value;
  }
}

module.exports = UserDto;
