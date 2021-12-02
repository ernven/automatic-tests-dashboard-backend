# GraphQL Test Back-End
This folder contains our test Back-End for running a GraphQL server and this is the additional documentation for it.

**Jump to:**<br/>
[Installation](#Installation)<br/>
[Using GraphQL](#Using-GraphQL)<br/>

## Introduction
This side-project/experiment was created based on the particular needs of this project, with highly customized queries.

Both implementations can be run simultaneously, as long as they are using different ports. For this reason, we have set two different env. vars. for each (see [Environment Variables](#Environment-variables)).

Just like the regular Back-End web server, this is written in Node.js using the express.js framework (v4.17).
Knex.js is used for handling the database connection and building queries and executing them (*Source:* https://knexjs.org/).
The client used is mysql2, compatible with both MySQL and MariaDB (*Source:* https://github.com/sidorares/node-mysql2).

## Project Structure
The project follows this structure (skipping mandatory node files and folders):

GraphQL-backend-test<br/>
&emsp;&emsp;    |- config       &emsp;&emsp;&ensp;&ensp;    Contains configuration files.<br/>
&emsp;&emsp;    |- GraphQL      &emsp;&ensp;                Contains the definitions for our schema, types and resolvers.<br/>
&emsp;&emsp;    |- index.js     &emsp;&emsp;&emsp;          Entry point for the web server.<br/>



## Installation
The easiest way to install the project is to clone this repository and **run npm install**.

Once installed, it can be run with **npm start** (which runs node index.js) or **npm run dev** (which runs nodemon index.js). Nodemon is a very handy utilty to take into use while doing development which, per its website, "will monitor for any changes in your source and automatically restart your server." (*Source:* https://nodemon.io). 

Before running, the required environment variables must be set.

### Environment variables
Addresses and logins have been bound to environment variables, which should be written to a file or specified at runtime.
The list of such is as follows:<br/>
`PORT_GRAPHQL`  &emsp;                      Sets the port for the GraphQL implementation.<br/>
`DB_URI`        &emsp;&emsp;&emsp;&emsp;    Address of the database server.<br/>
`DB_PORT`       &emsp;&emsp;&emsp;&ensp;    Port for connecting to the database.<br/>
`DB_SCHEMA`     &emsp;&emsp;&ensp;          Name of the database to be used.<br/>
`DB_USER`       &emsp;&emsp;&emsp;&ensp;    Username for the database user.<br/>
`DB_PASSWORD`   &emsp;&ensp;                Password for said database user.<br/>

## Using GraphQL
To perform queries, the `/graphql` endpoint is used. This can be tested within the GraphQL Playground utility in our browser (while in development mode only), or directly using Postman or our own apps.

#### Querying the data
In GraphQL we can specifiy the data that we want to return in the query, rather than receiving the whole set. The first example uses the following command to get all tests:

{   <br/> 
&emsp;  tests  {    <br/> 
&emsp;&emsp;    startTime   <br/> 
&emsp;&emsp;    endTime <br/> 
&emsp;&emsp;    testType    <br/> 
&emsp;&emsp;    componentName   <br/> 
&emsp;  }   <br/> 
}   <br/> 

By running this query, we are getting all the tests back but only receiving the startTime, endTime, testType and componentName for each. We can customise these to our liking by choosing whatever column set we want included in the result.

If we want to return tests from a specific Component (or more), we use the following query:

{   <br/> 
&emsp;  testsByComponent( <br/> 
&emsp;&emsp;    startDate: "YYYY-MM-DD"         <br/> 
&emsp;&emsp;    endDate: "YYYY-MM-DD"           <br/> 
&emsp;&emsp;    componentName: "componentB"     <br/> 
&emsp;  ){  <br/> 
&emsp;&emsp;    startTime                       <br/> 
&emsp;&emsp;    endTime                         <br/> 
&emsp;&emsp;    componentName                   <br/> 
&emsp;&emsp;    documentation                   <br/> 
&emsp;  }   <br/> 
}   <br/> 

Here, we specify the start date, end date and the component and our results will include only test results of the component we specify that took place between the start and end date. Again, we specify which columns we want to return in the results between the second brackets.

We can also obtain tests by test type with the following query:

{   <br/> 
&emsp;  testsByType(    <br/> 
&emsp;&emsp;    startDate: "YYYY-MM-DD"     <br/> 
&emsp;&emsp;    endDate: "YYYY-MM-DD"       <br/> 
&emsp;&emsp;    testType: "unit"            <br/> 
&emsp;  ){  <br/> 
&emsp;&emsp;    startTime                   <br/> 
&emsp;&emsp;    endTime                     <br/> 
&emsp;&emsp;    componentName               <br/> 
&emsp;&emsp;    testType                    <br/> 
&emsp;  }   <br/> 
}   <br/> 

Again, we use the start and end dates to specify the time frame and then include the type of tests we want to return. Once again, we use the second brackets to specify what columns we want to return.

#### Modifying the data
We can also insert data using GraphQL. For this, we use the same end point as with the queries, `/graphql`.

To post data we must use the keyword **_mutation_**. This can be done using either the GraphQL Playground or Postman.

Below is an example of a mutation that we could use with GraphQL.

mutation {  <br/> 
&emsp;  addTest (   <br/> 
&emsp;&emsp;    startTime: "2020-09-14 21:32:09.621000"     <br/> 
&emsp;&emsp;    endTime: "2020-09-14 21:39:09.621000"       <br/> 
&emsp;&emsp;    hasPassed: 1                                <br/> 
&emsp;&emsp;    totalPass: 98                               <br/> 
&emsp;&emsp;    totalFail: 0                                <br/> 
&emsp;&emsp;    testType: "unit"                            <br/> 
&emsp;&emsp;    testtrigger: "testTriggerA"                 <br/> 
&emsp;&emsp;    componentName: "componentB"                 <br/> 
&emsp;&emsp;    documentation: "GraphQL test"               <br/> 
&emsp;  )   <br/> 
}   <br/> 

When we send a query like this, we will get returned the **id** of the new column.
