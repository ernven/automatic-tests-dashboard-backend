const express = require('express')
const ComponentService = require('../controllers/ComponentService')

const router = express.Router()


// GET all test types
router.get('/', ComponentService.getTestComponents)


// GET tests by component
router.get('/:cName', ComponentService.getTestsByComponent)

router.get('/:cName/:firstDate/:secondDate?', ComponentService.getTestsByComponentAndDate)


module.exports = router