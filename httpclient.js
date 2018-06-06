const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

global.fetch = require('node-fetch');

const url =
  'https://5diuats2fa.execute-api.us-east-2.amazonaws.com/dev/new-bird-requests';
const auth =
  'eyJraWQiOiJvMUlDSjZkSFMxb0ZmcmVnYWthOFJXclpZOHE5VGhOaFFSUVFWSUJWYmJjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxNzM1ZTVmMC03NmIyLTQ1NmItYmZhNS1lNDBlM2YyNDFhMDgiLCJjb2duaXRvOmdyb3VwcyI6WyJBZG1pbkdyb3VwIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW5kZXIiOiJmIiwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo2MTY4NzQ3OTIzMjA6cm9sZVwvc2VydmljZS1yb2xlXC9EZW1vVXNlclBvb2wtU01TLVJvbGUiLCJwcm9maWxlIjoiZ29vZCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1IyS1VFTHRZSyIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiIxNzM1ZTVmMC03NmIyLTQ1NmItYmZhNS1lNDBlM2YyNDFhMDgiLCJnaXZlbl9uYW1lIjoieGluIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NjE2ODc0NzkyMzIwOnJvbGVcL3NlcnZpY2Utcm9sZVwvRGVtb1VzZXJQb29sLVNNUy1Sb2xlIl0sImF1ZCI6IjR0djdjbzYzZ2g5YXVkaHNrOGt1aGRzbTNmIiwiZXZlbnRfaWQiOiJiMTkzZjc1MC02OTRlLTExZTgtOGQ2My0xZjg0NTQ5NzYzNjAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUyODI2NDczNCwicGhvbmVfbnVtYmVyIjoiKzYxNDMwMjk2MTY2IiwiZXhwIjoxNTI4MjY4MzM0LCJpYXQiOjE1MjgyNjQ3MzQsImZhbWlseV9uYW1lIjoiZ3VhbiIsImVtYWlsIjoidHJhY3lndWFuMTA4QGdtYWlsLmNvbSJ9.qan3PQdQSAkTVE4DL2JxJcqKLjVNmdT4JawutHt8qyKvmwWOuhr9fFdIlw3Tts_1xKfF8jzsmtLm_f-CwmNFGWsuSOhcIbAkr85Zsg6rFDPwdia1n3NCN6ZSoaqiPdUWnXwJjkih7sXZfDVNV-4rhtORXPIdOLRj1AfLgGW63w7w6hk5R-dluPO8CaK1OuKtU6xomNnkB_Xn-5QbyDcPO5WsJVmvDFRg8fTK_Jvb1NUAog4BhggLoYiqyhKASfv-J6yN54XrMDLW-rknaO0gto7kNroCKEJ6kSinAF7YjgN9u36c7giJg4dQXd5NQN4qrd6yRo3_LmYNdcTMJxlmSw';

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
get();
// post();
