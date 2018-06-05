const axios = require('axios');

const url = 'https://inezqnx1o0.execute-api.us-east-2.amazonaws.com/dev/new-bird-request';
const auth = '';

axios
  .post(url, {
    note: 'why receive message does not work against sqs queue!!!!'
  }, {
    headers: {
      'content-type': 'application/json',
      'Authorization': auth
    }
  })
  .then(function(response) {
    console.log(response.status, response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
