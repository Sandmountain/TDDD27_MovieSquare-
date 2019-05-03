const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-plus-token"); // Placeholde while testing backend functionality, going to change to passport-google-oauth2
const FacebookStrategy = require("passport-facebook-token"); // Placeholde while testingbackend functionality, going to change to passport-facebook
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("config");

const User = require("./models/User");

// JWT Strategy
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
      secretOrKey: config.get("jwtSecret")
    },
    async (JWTpayload, done) => {
      try {
        // Check for user
        const user = await User.findById(JWTpayload._id);

        console.log("user", user);

        // If user does not exist
        if (!user) {
          return done(null, false, { msg: "Not a valid user!" });
        }

        // Return user if it exists
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Local Strategy
passport.use(
  "localStrat",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        // Finding a user based on the email.
        const user = await User.findOne({ "local.email": email });

        if (!user) {
          return done(null, false, { msg: "No user with that email" });
        }

        // Checking the the password is valid
        const isMatch = await user.isValidPassword(password);

        // If password is not
        if (!isMatch) {
          return done(error, false, { msg: "Wrong password!" });
        }

        done(null, user, { msg: "Sucessful login!" });
      } catch (error) {
        console.log("error", error);
        done(error, false);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: config.get("facebook.clientID"),
      clientSecret: config.get("facebook.clientSecret")
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ "facebook.id": profile.id });

        console.log("profile", profile);

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            name: profile.name.givenName,
            email: profile.emails[0].value
          }
        });

        await newUser.save();

        done(null, newUser);
      } catch (error) {
        console.log("error", error);
        done(error, false);
      }
    }
  )
);

// Google Strategy
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: config.get("google.clientID"),
      clientSecret: config.get("google.clientSecret")
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ "google.id": profile.id });

        console.log("profile", profile);

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            name: profile.name.givenName,
            email: profile.emails[0].value
          }
        });

        await newUser.save();

        done(null, newUser);
      } catch (error) {
        console.log("error", error);
        done(error, false);
      }
    }
  )
);
