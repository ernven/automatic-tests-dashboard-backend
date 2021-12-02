const knex = require('knex')
const config = require('../config/config')
const { validator } = require('../utils/validator')

const db = knex(config.db)


// This is what we'll be selecting in our queries
const columns = ['startTime', 'totalFail', 'totalPass']


// Displaying all tests (not very efficient!)
exports.getTests = (request, response) =>
    db('outerSuite').select(columns)
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))

// Displaying all tests between certain dates
exports.getTestsByDate = (request, response) => {
    let firstDate, secondDate

    firstDate = request.params.firstDate
    // if no second date, we set it as today, otherwise it's parsed.
    secondDate = request.params.secondDate ? request.params.secondDate : new Date()

    db('outerSuite').select(columns)
        .andWhereBetween('startTime', [firstDate, secondDate])
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}


// Displaying tests with custom filters
exports.getTestsCustom = (request, response) => {
    let body = []
    let selected, startDate, endDate
    
    // The request body is manually parsed (not using libraries)
    request
    .on('data', chunk => body.push(chunk))
    .on('end', () => {
        try {
            body = JSON.parse(Buffer.concat(body))

            // Check the mandatory fields are included
            if (!body.types || !body.components) {
                let err = 'At least one test type and component name are required.'

                return response.status(400).json({error: err})

            } else {
                // If custom columns are specified, select those. Otherwise use a default set.
                selected = body.columns ?
                    body.columns : ['componentName', 'testType', 'startTime', 'totalFail', 'totalPass']

                // If a start date has been set, run a time-constrained query
                if (body.startDate) {
                    startDate = body.startDate
                    endDate = body.endDate ? body.endDate : new Date()

                    return db('outerSuite').select(selected)
                        .whereIn('testType', body.types).and.whereIn('componentName', body.components)
                        .andWhereBetween('startTime', [startDate, endDate])
                    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
                    .catch(err => response.status(500).json({error: err}))
                    
                } else {    // If not, run default query with no set timeframe
                
                db('outerSuite').select(selected)
                    .whereIn('testType', body.types).and.whereIn('componentName', body.components)
                .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
                .catch(err => response.status(500).json({error: err}))
                }
            }
        } catch {
            return response.status(400).send("There was a problem with your request.")
        }
    })
}


// On POST, inserting a test/array of tests into the database
exports.postInsertTests = (request, response) => {
    let body = []
    let errors = []
    
    // The request body is manually parsed (not using libraries)
    request
    .on('data', chunk => body.push(chunk))
    .on('end', () => {
        try {
            body = JSON.parse(Buffer.concat(body))
            let result
            let valid = true

            // Iterating through the request body and validating the items
            // Errors are saved, to be sent in the response
            body.map((test, index) => {
                result = validator.runSync(test)
                
                if (result[0]) {
                    valid = false
                    errors.push({index: index, error: result[0]})
                }
            })

            // If errors are found, no inserting is done
            valid ? db('outerSuite').insert(body)
                .then(id => response.status(201).json({row: id}))
                .catch(err => response.status(500).json({error: err}))
            : response.status(400).json({errors: errors})
        } catch {
            return response.status(400).send("There was a problem with your request.")
        }
    })
}