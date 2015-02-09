var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config/config');
var User = require('../models/user')

module.exports = function(passport)
{
	passport.use('facebook',new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url,
    profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value }, function(err, user) {
     if(err) { console.log(err); }
     if (!err && user != null) {
       done(null, user);
     } else {
       var user = new User({
         email: profile.emails[0].value,
         firstname: profile.displayName.split(" ")[0],
         lastname: profile.displayName.split(" ")[1],
         image: profile.photos[0].value,
         created: Date.now()
       });
       user.save(function(err) {
         if(err) {
           console.log(err);
         } else {
           console.log("saving user ...");
           done(null, user);
         };
       });
     };
    });
  }
));

}
