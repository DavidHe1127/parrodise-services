const AWS = require('aws-sdk');
const util = require('util');
const sqs = new AWS.SQS({
  region: process.env.REGION
});

const receiveMessagePromise = util.promisify(sqs.receiveMessage);

module.exports.getNewBirdRequest = event => {
  receiveMessagePromise
    .call(sqs, {
      QueueUrl: process.env.QUEUE_URL,
      MaxNumberOfMessages: 10,
    })
    .then(msg => {
      console.log(msg);
    })
    .catch(err => {
      console.log(err);
    });
};
