import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import config from './config/config.js'
import graphql_tests from './GraphQL/tests.js'

const app = express()

// Enabling Cross-Origin Resource Sharing to allow AJAX requests from the Front-End (for dev time only!)
app.use(cors())


app.get('/', (req, res) => res.status(200).send('GraphQL Backend Working! Try it on /graphql'))


// This enables GraphQL
const server = new ApolloServer({
    modules: [
        graphql_tests
    ],
})

server.applyMiddleware({ app })


// GraphQL needs its own port to run separately
app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`)
})