import { gql } from 'apollo-server-express'
import { GraphQLScalarType, Kind } from 'graphql'
import knex  from 'knex'
import config from '../config/config.js'

const db = knex(config.db)


/* 
    ## Types are defined here:

    - A custom scalar is defined for Date type (not part of default GraphQL).
    - A schema is defined for our Test objects. 
    - Queries are defined for the user to run, with this structure: name(arguments): return_type
    - A mutator is defined, required to insert data. Using similar structure as queries.

    - Note that it's very important to check required fields and data types for validation.
*/
const typeDefs = gql`
    scalar Date

    type Test {
        startTime: Date!
        endTime: Date!
        testtrigger: String!
        testType: String!
        componentName: String!
        totalFail: Int!
        totalPass: Int!
        documentation: String
        hasPassed: Int!
    }

    extend type Query {
        tests: [Test]
        testsByComponent(startDate: Date, endDate: Date, componentName: String!): [Test]
        testsByType(startDate: Date, endDate: Date, testType: String!): [Test]
    }

    type Mutation {
        addTest(
            startTime: Date!
            endTime: Date!
            testtrigger: String!
            testType: String!
            componentName: String!
            totalFail: Int!
            totalPass: Int!
            documentation: String
            hasPassed: Int!
        ): [ID]
    }    
`

// Resolvers are the functions which return the required data (meeting the definition criteria).
const resolvers = {
    // Date is not a scalar type by default in GraphQL. Here we implement it ourselves.
    // Source and docs: https://www.graphql-tools.com/docs/scalars
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          return new Date(value); // Parsing an obtained value
        },
        serialize(value) {
          return value.getDate(); // This is sent to the client
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
          }
          return null;
        },
    }),
    // Here are the Query functions
    // Used for fetching data FROM the database.
    Query: {
        tests: async (parent, args, context, info) => {
            let columns = getColumns(info)

            return db('outerSuite').select(columns)
        },
        testsByComponent: async (parent, args, context, info) => {
            let columns = getColumns(info)

            if (args.startDate) {
                let end = args.endDate ? args.endDate : new Date()

                return db('outerSuite').select(columns)
                    .where('componentName', args.componentName)
                    .andWhereBetween('startTime', [args.startDate, end])
            }

            return db('outerSuite').select(columns)
                .where('componentName', args.componentName)
        },
        testsByType: async (parent, args, context, info) => {
            let columns = getColumns(info)

            if (args.startDate) {
                let end = args.endDate ? args.endDate : new Date()
                
                return db('outerSuite').select(columns)
                    .where('testType', args.testType)
                    .andWhereBetween('startTime', [args.startDate, end])
            }

            return db('outerSuite').select(columns)
                .where('testType', args.testType)
        },
    },
    // Mutations are used to insert data INTO the database (~equiv. to POST)
    Mutation: {
        addTest: async (parent, args, context, info) => {
            return db('outerSuite').insert(args)
        }
    },
}

export default { typeDefs, resolvers }


// Helper function to find column list
const getColumns = i => {
    let arr = []
    let selectionSet = i.fieldNodes[0].selectionSet.selections

    selectionSet.forEach(item => arr.push(item.name.value))

    return arr
}