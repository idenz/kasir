const express = require('express')
const passport = require('passport')

const router = express.Router();
const controller = require('./address.controller')

router
    .get("/", [passport.authenticate("jwt", {session: false})], controller.getById)
    .get("/kecamatan", [passport.authenticate("jwt", {session: false})], controller.getKecamatanByKotaId)

module.exports = router