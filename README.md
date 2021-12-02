# Automatic Tests Dashboard Project - Backend
This Back End architecture was done as part of our Course Project in Haaga-Helia. The whole service (including Front End in a separate repository) is meant to display a dashboard summarizing results from automated tests performed, when the results were added to the database.

The Back End Web Server was done by me, ernven (the GraphQL implementation was done in collaboration with Simon).
The Database was done by Arttu, Geoffrey and Simon. The SSH documentation and test parsing (not featured here) were done by Nikita.

Backend, SSH tunnel and database documentation are all found in their respective folders.


## Using the API
The resources accessed are the outer suite of tests stored in the database.
The following endpoints are implemented and operational (requiring a user with sufficient privileges to perform said action):

### Querying metadata
`GET /api/tests/type` - Returns a list of existing test types in the database.

`GET /api/tests/component` - Returns a list of components for which there are tests in the database.

### Fetching data from the database
`GET /api/tests/all` - Returns all tests sorted by id.

`GET /api/tests/type/{type}` - Returns all tests from a specified type, if any exists.

`GET /api/tests/component/{name}` - Returns all tests for a single component matching the given component name, if at least one test has been run.

All `GET` endpoints support filtering by date now, appending `/startDate/endDate` to the URI. Both are optional, skipping the endDate parameter will default to the current date and skipping both -expectedly- returns all records regardless. The date format should be ISO standard, that is **YYYY-MM-DD**.

#### Custom queries
`POST /api/tests/custom` - Returns all tests matching a certain set of parameters specified in the request body.

The set must be an object, in **JSON** format, following this model:

```json
{
  "columns": ["col_1", "col_2", "col_3"],
  "types": ["type_1", "type_2", "type_3"],
  "components": ["Component_1", "Component_2"],
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD"
}
```

Fields "types" and "components" are the only ones mandatory, all the rest being optional.

The field "columns" defaults to: *component name, test type, start date, total fail and total pass*.

Date handling works the same way as in the previous example, if only a start date is given, the end is considered the present day.


### Inserting data into the database
`POST /api/tests` - Saves one or more entries to the database, from the data passed in the request body (as either an object or an array of objects, in JSON format). Returns the row **id** of the object added in the database.
