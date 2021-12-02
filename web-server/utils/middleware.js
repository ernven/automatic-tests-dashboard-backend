// This middleware is to handle all disallowed methods and non-implemented endpoints
exports.endpointHandler = (request, response) =>
    (request.url === '/api/tests/all' ||
        request.url === '/api/tests/type' ||
        request.url === '/api/tests/component')
    && (request.method === 'PUT' ||
        request.method === 'POST' ||
        request.method === 'DELETE')
    ? response.status(405).header({Allow: 'GET'}).end()
    : response.status(404).end()


// This is for enhanced error-handling (used mostly when inserting)
exports.errorHandler = (err, request, response) => {
    //console.log(err)
    return (err.code === 'ER_BAD_FIELD_ERROR' || err.code === 'ER_NO_DEFAULT_FOR_FIELD') ?
        response.status(400).json({ error: err.sqlMessage }) :
        response.status(500).json(err)
}