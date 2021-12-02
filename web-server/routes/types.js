const express = require('express')
const TypeService = require('../controllers/TypeService')

const router = express.Router()


// GET all test types
router.get('/', TypeService.getTestTypes)


// GET tests by type
router.get('/:type', TypeService.getTestsByType)

router.get('/:type/:firstDate/:secondDate?', TypeService.getTestsByTypeAndDate)


module.exports = router