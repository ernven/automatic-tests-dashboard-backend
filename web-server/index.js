const express = require('express')
const cors = require('cors')
const config = require('./config/config')
const tests = require('./routes/tests')
const types = require('./routes/types')
const components = require('./routes/components')
const middlewares = require('./utils/middleware')

const app = express()

// Enabling Cross-Origin Resource Sharing to allow AJAX requests from the Front-End (for dev time only!)
app.use(cors())


// Basic endpoint (To be removed later? I don't know if there's any use for it)
app.get('/', (request, response) => response.status(200).send('Back End working.'))

// Requests defined in the routing
app.use('/api/tests', tests)
app.use('/api/tests/type', types)
app.use('/api/tests/component', components)


// This middleware is to handle all disallowed methods and non-implemented endpoints
app.use(middlewares.endpointHandler)

// This is for enhanced error-handling (used mostly when inserting)
app.use(middlewares.errorHandler)


// Port config is stored in config file (under config folder)
app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`)
})