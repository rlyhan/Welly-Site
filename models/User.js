var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  favouritePlaces: [{
    name: {
      type: String,
      required: true
    },
    yelpId: {
      type: String,
      required: true,
      unique: true
    }
  }]
});

// Hash password
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
