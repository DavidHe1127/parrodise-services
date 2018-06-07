const AWS = require('aws-sdk');
const util = require('util');
const sqs = new AWS.SQS({
  region: process.env.REGION,
});

const receiveMessagePromise = util.promisify(sqs.receiveMessage);

module.exports.getNewBirdRequest = (event, context, callback) => {
  receiveMessagePromise
    .call(sqs, {
      QueueUrl: process.env.QUEUE_URL,
      MaxNumberOfMessages: 10,
    })
    .then(msg => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          message: msg,
        }),
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'Messages cannot be received for some reasons',
      });
    });
};
