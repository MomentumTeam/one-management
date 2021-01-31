const passport = require("passport");
const shraga = require("passport-shraga");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  let mongoUser = await User.findOne({ userId: user.id });
  if (!mongoUser) {
    mongoUser = new User({
      userId: user.id,
      history: [],
      favorites: [],
    });
    await mongoUser.save();
  }
  done(null, user);
});

const config = {
  callbackURL: `${process.env.SERVER_URL || "http://localhost:4000"}/api/success`,
  shragaURL: process.env.SHRAGA_URL || "http://13.79.7.3",
  useADFS: true,
  useEnrichId: true,
};
passport.use(
  new shraga.Strategy(config, (profile, done) => {
    if (profile && profile.RelayState) {
      profile.RelayState = profile.RelayState.replace("%26", "&");
    }
    const user = {
      id: profile.id,
      name: profile.name.firstName + " " + profile.name.lastName,
      displayName: profile.displayName,
      job: profile.job,
      relayState: profile.RelayState,
    };
    return done(null, user);
  })
);
module.exports = passport;
