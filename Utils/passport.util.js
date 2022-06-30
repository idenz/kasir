
const ppjwt = require("passport-jwt");
const config = require("../Config/app.config")

const UserModel = require('../Database/mongodb.database').User
const Strategy = ppjwt.Strategy;
const ExtractJWT = ppjwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret_key,
}

module.exports = (passport) => {
    passport.use(
        new Strategy(options, (payload, done) => {
            UserModel.findById(payload.id)
            .then((user) => {
                if (user) {
                    return done(null, {
                        _id: user._id,
                        full_name: user.full_name,
                        email: user.email,
                    })
                }

                return done(null, false)
            })
            .catch((err) => {
                console.error(err);
            })
        })
    )
}