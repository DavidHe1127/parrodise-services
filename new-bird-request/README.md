## Parrodise New Bird Request

We have a whole bunch of existing birds users can create product from. In the case of your product being based off a non-existent bird, you can send a request to admin who will later review and execute your new bird request.

### Workflow

* Regular users are able to lodge a request from within the portal
* Admin logins to review the requests
* Admin can either accept or reject the request. The accepted request will in return add the new bird as a base to database table

### Tech behind the scene
A `SNS` topic is created for new bird request. A `SQS` queue is created and subscribed to the created topic.
`SNS` publishes new message (request) to the subscribed queue.

### Tech Stack
* Lambda
* SNS
* SQS
* API Gateway
* Serverless framework