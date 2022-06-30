const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../../Config/app.config')

module.exports = {
    login: async function(user){
        let result;
        try {
            const schema = Joi.object({
                email: Joi.string().email().required()
            })

            const { error } = schema.validate({ email: user.email })

            if (error) {
                return (result = {
                  status: error.name,
                  message: error.details[0].message,
                });
            }

            let payload = {
                id: user.id,
                username: user.username,
                email: user.email,
            }

            const token = jwt.sign(payload, config.secret_key, { expiresIn: "6h" });
            if (!token) return (result = { status: "jwt_error", message: err });

            result = {
                token: token,
                items: {
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                },
            };
       

        } catch (error) {
            result = null
            console.log(error);
        }

        return result
    },
}