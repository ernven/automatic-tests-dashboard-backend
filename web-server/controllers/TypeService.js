const knex = require('knex')
const config = require('../config/config')

const db = knex(config.db)

// This is what we'll be selecting in our queries
const columns = ['startTime', 'totalFail', 'totalPass']


// Base function for correct Front-End operation
exports.getTestTypes = (request, response) =>
    db('outerSuite').distinct('testType')
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))


// OLD ENDPOINTS (2nd Sprint)

// Displaying tests by type
exports.getTestsByType = (request, response) => {
    let type = request.params.type

    db('outerSuite').select(columns)
        .where('testType', type)
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}


// Displaying tests by type, filtered between dates
exports.getTestsByTypeAndDate = (request, response, next) => {
    let type = request.params.type
    let firstDate, secondDate

    firstDate = request.params.firstDate
    secondDate = request.params.secondDate ? request.params.secondDate : new Date()

    db('outerSuite').select(columns)
        .where('testType', type)
        .andWhereBetween('startTime', [firstDate, secondDate])
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
    //.catch(error => next(error))
}