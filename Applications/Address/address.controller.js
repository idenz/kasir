const ErrorBuilder = require('../../Utils/error.util')
const AddressServices = require('./address.service')

module.exports = {
    getById: async function (req, res, next) {
        
        const result = await AddressServices.getById(req.body.id);
        if(result.length === 0) return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't found data id"}, req, res)

        res.status(200).json({
            status: 'success',
            data: result
        })

    },

    getKecamatanByKotaId: async function (req, res, next) {
        
        const result = await AddressServices.getKecamatanByKotaId(req.body.kota_id);
        if(result.length === 0) return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't found data id"}, req, res)

        res.status(200).json({
            status: 'success',
            data: result
        })

    },
}