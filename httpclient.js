const axios = require('axios');

const url =
  'https://0dwbyys8l9.execute-api.us-east-2.amazonaws.com/dev/new-bird-requests';
const auth = '';

function post() {
  axios
    .post(
      url,
      {
        note: 'why receive message does not work against sqs queue!!!!',
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: auth,
        },
      },
    )
    .then(function(response) {
      console.log(response.status, response.data);
    })
    .catch(function(error) {
      console.log(error.response.data, error.response.status);
    });
}

function get() {
  axios
    .get(
      url,
      {
        headers: {
          Authorization: auth,
        },
      },
    )
    .then(function(response) {
      console.log(response.status, response.data);
    })
    .catch(function(error) {
      console.log(error.response.data, error.response.status);
    });
}


get();