'use strict';

module.exports = getCatchAll;


function getCatchAll(request, response) {
  response.status(404).send(`Sorry the page is not found, <br> Please refresh the page <br> OR <br> return to http://localhost:${PORT}/.`)
};
