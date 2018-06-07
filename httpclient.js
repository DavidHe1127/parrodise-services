const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

global.fetch = require('node-fetch');

const url =
  'https://cfm5fzwjei.execute-api.ap-southeast-2.amazonaws.com/dev/new-bird-request';
const auth =
  '';

function post() {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      note: 'Finally I get this sqs/sns working',
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: auth,
    },
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      console.log(err);
    });
}

function get() {
  fetch(url, {
    headers: {
      Authorization: auth,
    },
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function authenticate() {
  var authenticationData = {
    Username: 'tracyguan108@gmail.com',
    Password: '5223365DavidHe',
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData,
  );
  var poolData = {
    UserPoolId: 'us-east-2_R2KUELtYK',
    ClientId: '4tv7co63gh9audhsk8kuhdsm3f',
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username: 'tracyguan108@gmail.com',
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log('token is \n' + result.getIdToken().getJwtToken());
    },

    onFailure: function(err) {
      console.log('err', err);
    },
  });
}

// authenticate();
// get();
// post();
