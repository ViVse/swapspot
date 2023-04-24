import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import User from "../../models/User.js";

export default function useGoogleStrategy(passport) {
  const serverUrl = process.env.SERVER_URL;

  // google strategy
  const googleLogin = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${serverUrl}/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      try {
        const oldUser = await User.findOne({ email: profile.email });

        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }

      try {
        const newUser = await new User({
          provider: "google",
          googleId: profile.id,
          email: profile.email,
          name: profile.displayName,
          avatar: profile.picture,
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  );

  passport.use(googleLogin);
}
