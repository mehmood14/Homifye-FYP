var JwtStrategy = require("passport-jwt").Strategy,
  extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users");

module.exports = function (passport) {
  var opts = {};

  opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
