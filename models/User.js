var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
      }
    }
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    picture: Object
  },
  password: {
    type: String
  },
  favouritePlaces: [{
    name: {
      type: String
    },
    yelpId: {
      type: String
    }
  }]
});

// Hash password
// UserSchema.pre('save', function(next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if (err) return next(err);
//     user.password = hash;
//     next();
//   })
// });

var User = mongoose.model('User', UserSchema);
module.exports = User;
