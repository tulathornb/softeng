const User = require("../Models/user");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "FTEST",
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const userData = await User.findOne({
      username: payload.username
    });
    if (!userData) throw { message: "No Auth" };
    done(null, true, userData);
  } catch (error) {
    done(null, false);
  }
});

passport.use(jwtAuth);

// Passport Middleware
const requireJWTAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, token, data) => {
    if (!token) {
      return res.send({ status: 401, message: "No Auth" });
    }
    req.user = data;
    next();
  })(req, res, next);
};

module.exports = requireJWTAuth;
