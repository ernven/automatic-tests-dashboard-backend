const Checkit = require('checkit')

// Custom date validator (basic, for now, just format)
Checkit.Validator.prototype.dateValidator = val => {
    let pattern = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.?\d{0,6}$/

    return pattern.test(val) ? true : false
}


// Validator built on given model
const checkit = new Checkit({
    startTime: ['required', 'dateValidator'],
    endTime: ['required', 'dateValidator'],
    testtrigger: ['required', 'string'],
    testType: ['required', 'string'],
    componentName: ['required', 'string'],
    totalFail: ['required', 'integer'],
    totalPass: ['required', 'integer'],
    documentation: ['string'],
    hasPassed: ['required', 'integer'],
})


/* Validator function exported
exports.run = async object =>
  await checkit.run(object)
    .then(_ => 1)
    .catch(err => err)*/

exports.validator = checkit