const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const sns = new AWS.SNS({
  region: process.env.REGION
});

module.exports.requestNewBird = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.note !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t add the note.',
    });
    return;
  }

  const params = {
    Message: data.note,
    TopicArn: process.env.TOPIC_ARN
  };

  sns.publish(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t add the note due an internal error. Please try again later.',
      });
    }
    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully added the note.' }),
    };
    callback(null, response);
  });
};
