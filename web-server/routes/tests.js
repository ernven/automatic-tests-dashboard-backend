const express = require('express')
const testController = require('../controllers/TestController')

const router = express.Router()


// GET all tests, plus filtering between two dates
router.get('/all', testController.getTests)

router.get('/all/:firstDate/:secondDate?', testController.getTestsByDate)

// GET tests with fitting criteria (test types and component names)
// Object passed in req body must fit the model in docs
router.get('/custom', testController.getTestsCustom)


// POST JSON object/array of tests
router.post('/', testController.postInsertTests)


module.exports = router