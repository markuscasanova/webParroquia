'use strict';

const queryString = require('querystring');

module.exports.hello = async (event, contact) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hola ' + event.pathParameters.name,
      },
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.showUser = async (event, contact) => {
  const body = queryString.parse(event['body'])
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Petición Post',
        input: 'Hola '+ body.name + ' ' + body.lastName
      },
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};