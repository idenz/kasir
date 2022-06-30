const ErrorBuilder = require('../../Utils/error.util')
const UserServices = require('../User/user.service')
const AuthServices = require('./auth.service')

module.exports = {
    login: async function (req, res, next) {
        
        let find_email = await UserServices.getByEmail(req.body.email)
        if(!find_email) return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't found your credential"}, req, res)
        
        if (req.body.password != find_email.password) {
            return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't found your credential"}, req, res)
        }

        let login = await AuthServices.login(find_email)
        if(login?.status === "ValidationError") return ErrorBuilder({ statusCode: 400, isOperational: true, status: "Validation Failed", message: login.message}, req, res)
        if(!login) return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't found your credential"}, req, res)

        res.status(200).json({
            status: 'success',
            token: login.token,
            data: login.items
        })

    },

    register: async function(req, res, next){

        let user = await UserServices.create(req.body)
        if(user === 1) return ErrorBuilder({ statusCode: 400, isOperational: true, message: "This email has been register"}, req, res)
        if(!user) return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Failed create user"}, req, res)

        res.status(200).json({
            status: 'success',
            data: user
        })
    },
}