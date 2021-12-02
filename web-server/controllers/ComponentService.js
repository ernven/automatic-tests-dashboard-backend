const knex = require('knex')
const config = require('../config/config')

const db = knex(config.db)

// This is what we'll be selecting in our queries
const columns = ['startTime', 'testType', 'totalFail', 'totalPass']


// Basic function for Front End operation
exports.getTestComponents = (request, response) =>
    db('outerSuite').distinct('componentName')
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))


// OLD ENDPOINTS (2nd Sprint)

// Displaying tests by component
exports.getTestsByComponent = (request, response) => {
    let componentName = request.params.cName

    db('outerSuite').select(columns)
        .where('componentName', componentName)
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}


// Displaying tests by component, filtered between dates
exports.getTestsByComponentAndDate = (request, response) => {
    let componentName = request.params.cName
    let firstDate, secondDate

    firstDate = request.params.firstDate
    secondDate = request.params.secondDate ? request.params.secondDate : new Date()

    db('outerSuite').select(columns)
        .where('componentName', componentName)
        .andWhereBetween('startTime', [firstDate, secondDate])
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}