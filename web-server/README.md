# Web Server Documentation 

## Introduction
The Back-End web server is written in Node.js using the express.js framework (v4.17).

Knex.js is used for handling the database connection and building queries and executing them (_Source:_ https://knexjs.org/).
The client used is mysql2, compatible with both MySQL and MariaDB (_Source:_ https://github.com/sidorares/node-mysql2).

Validation is done using the checkit library (_Source:_ https://github.com/tgriesser/checkit).

## Project Structure
The project follows this structure (skipping mandatory node files and folders):

web-server<br/>
&emsp;&emsp;    |- config       &emsp;&emsp;        Contains configuration files.<br/> 
&emsp;&emsp;    |- docs         &emsp;&emsp;&ensp;  Contains documentation, in .doc and .pdf format.<br/> 
&emsp;&emsp;    |- routes       &emsp;&emsp;        Contains the different routes used by express.<br/> 
&emsp;&emsp;    |- tests        &emsp;&emsp;&ensp;  Contains tests (incl. Postman test collections).<br/> 
&emsp;&emsp;    |- utils        &emsp;&emsp;&emsp;  Contains various utilities such as middlewares and the validation module.<br/> 
&emsp;&emsp;    |- index.js     &emsp;&ensp;        Entry point for the web server.<br/> 


## Installation
The easiest way to install the project is to clone this repository and run **npm install**.

Once installed, it can be run with **npm start** (which runs node index.js) or **npm run dev** (which runs nodemon index.js). Nodemon is a very handy utilty to take into use while doing development which, per its website, "will monitor for any changes in your source and automatically restart your server." (_Source:_ https://nodemon.io). 

Instructions for using the API can be found in the main readme, in the root folder of the Back-End repository.

Before running, the required environment variables must be set.

### Environment variables
Addresses and logins have been bound to environment variables, which should be written to a file or specified at runtime.
The list of such is as follows:<br/>
`PORT`          &emsp;                      Port to be used by the web server.<br/>
`DB_URI`        &emsp;&emsp;&emsp;&emsp;    Address of the database server.<br/>
`DB_PORT`       &emsp;&emsp;&emsp;&ensp;    Port for connecting to the database.<br/>
`DB_SCHEMA`     &emsp;&emsp;&ensp;          Name of the database to be used.<br/>
`DB_USER`       &emsp;&emsp;&emsp;&ensp;    Username for the database user.<br/>
`DB_PASSWORD`   &emsp;&ensp;                Password for said database user.<br/>
