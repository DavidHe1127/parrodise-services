const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const sns = new AWS.SNS({
  region: process.env.REGION,
});

module.exports.requestNewBird = (event, context, callback) => {
  const data = JSON.parse(event.body);

  if (!data.payload || !data.payload.status || !data.payload.reason) {
    callback(null, {
      statusCode: 400,
      headers: {'Content-Type': 'text/plain'},
      body: "Payload is either empty or it does not have status or reason properties",
    });

    return;
  }

  data.payload.timestamp = Date.now();

  const params = {
    Message: JSON.stringify(data.payload),
    TopicArn: process.env.TOPIC_ARN,
  };

  sns.publish(params, error => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 501,
        headers: {'Content-Type': 'text/plain'},
        body:
          "Couldn't add the note due an internal error. Please try again later.",
      });
    }
    // create a resonse
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'Successfully added the note.'}),
    };
    callback(null, response);
  });
};
