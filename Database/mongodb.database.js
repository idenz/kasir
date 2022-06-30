const glob = require('glob')
const Mongoose = require('mongoose');
const path = require('path');
const config = require('../Config/app.config')
let db = {}

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoCreate: true,
    autoIndex: true,
}

let mongoose = Mongoose.connect(config.mongodb_url, options)

glob.sync('./**/*.model.js').forEach(file => {
    const model     = require(path.join("../", file))
    db[model.modelName] = model
})

db.mongoose = mongoose.connection
db.Mongoose = Mongoose

module.exports = db;