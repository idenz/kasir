const ErrorBuilder = require('../Utils/error.util')

module.exports = {
  create: (Model) => async function (req, res, next) {
    try {
 
        const create = await Model.create(req.body)
        if(!create){
            return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't create data"}, req, res)
        }

        res.status(200).json({
            status: 'success',
            items : create
        })

    } catch (error) {
        console.log(error);
        return ErrorBuilder(error, req, res)
    }
  },

  getAll: (Model) => async function (req, res, next) {
    try {
        /** Page & Limit */
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        let filter = req.query.filter
        filter.isDelete = false

        let sort   = { $natural: -1 }
        if(req.query.sort) sort[req.query.sort] = -1

        let icount = await Model.find(filter).countDocuments();
        let result = await Model.find(filter).select('-__v').skip(skip).limit(limit).sort(sort)

        res.status(200).json({
            status: "success",
            totalItem: icount,
            items: result,
        });

    } catch (error) {
        console.log(error);
        return ErrorBuilder(error, req, res)
    }
  },

  getById: (Model) => async function (req, res, next) {
    try {

        let filter = { isDelete: false, _id: req.params.id }
        const result = await Model.findOne(filter).select("-__v")

        if(!result){
            return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't found data"}, req, res)
        }

        res.status(200).json({
            status: "success",
            items: result,
        });

    } catch (error) {
        console.log(error);
        return ErrorBuilder(error, req, res)
    }
  },

  update: (Model) => async function (req, res, next) {
    try {
        
        let filter = { isDelete: false, _id: req.params.id }
        let result = await Model.findOneAndUpdate(filter, req.body, { new: true, runValidators: true })

        if(!result){
            return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't update data"}, req, res)
        }

        res.status(200).json({
            status: "success",
            items: result,
        });
    } catch (error) {;
        console.log(error);
        return ErrorBuilder(error, req, res)
    }
  },

  delete: (Model, permanent = true) => async function (req, res, next) {
    try {
        let result;

        if(permanent) result = await Model.findByIdAndDelete(req.params.id)
        else result = await Model.findByIdAndUpdate(req.params.id, { isDelete: true })

        if(!result) {
            return ErrorBuilder({ statusCode: 400, isOperational: true, message: "Can't delete data"}, req, res)
        }

        res.status(200).json({
            status: "success",
            message: "Delete user success",
        });
        
    } catch (error) {
        console.log(error);
        return ErrorBuilder(error, req, res)
    }
  },
};
