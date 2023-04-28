import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import User from "../models/User.js";
import { STORAGE_OPTIONS } from "../../../const/storageOptions.js";

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
      try {
        const oldUser = await User.findOne({ email: profile.email });

        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        done(err, false);
      }

      try {
        const newUser = await new User({
          provider: "google",
          googleId: profile.id,
          email: profile.email,
          name: profile.displayName,
          avatar: {
            storage: STORAGE_OPTIONS.LINK,
            publicUrl: profile.picture,
          },
        }).save();
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  );

  passport.use(googleLogin);
}
