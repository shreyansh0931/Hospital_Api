// Import necessary dependencies
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const Doctor = require('../models/doctor'); 

// Define options for the JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY, 
};

// Create and configure the JWT strategy
passport.use(
  new JWTStrategy(opts, async (jwtpayload, done) => {
    try {
      const user = await Doctor.findById(jwtpayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log('Error in finding user from JWT');
      return done(err, false);
    }
  })
);

module.exports = passport;
