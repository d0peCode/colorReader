'use strict'

const express = require('express')
const router = express.Router()
const colorController = require('../../controllers/color.controller')
const auth = require('../../middlewares/authorization')

router.post('/add', colorController.add)
router.delete('/remove', auth(), colorController.remove)

module.exports = router
