## Parrodise Image Processor

Process and resize image on the fly

### Tech Stack
  * S3
  * IAM
  * serverless framework
  * API Gateway
  * Lambda

### Test URL
https://cpbemqvq1k.execute-api.us-east-2.amazonaws.com/dev/process-image?f=01.PNG&w=100&q=10
### localhost
http://localhost:3000/process-image?f=01.PNG&w=100&q=10

### Heads-up
`sharp` requires native extensions. In order to run on Lambda, it must be packaged on Amazon Linux.

```shell
rm -rf node_modules/sharp
docker run -v "$PWD":/var/task lambci/lambda:build-nodejs8.10 npm install
```

Refer to [Sharp with AWS Lambda](http://sharp.dimens.io/en/latest/install/#aws-lambda) for solution.

### Notes

* CloudFormation
  * Logical ID:

  ```yml
  Resources:
    <LOGICAL ID>:
      Type: Resource type
      Properties:
        Set of properties
  ```

  * Physical ID:
  `cpbomqvq1k` is physical id in below url.
  ```yml
  https://cpbomqvq1k.execute-api.us-east-2.amazonaws.com/dev
  ```
  * `${AWS::Region}`, `AWS::Region` is pseudo parameter that points to region in your stack.
  * `${Api}` will return the `physical ID` of resource `Api`.
  * `HostName: !Sub ${Api}.execute-api.${AWS::Region}.amazonaws.com` - sub is used to tell cloudFormation interpolation is needed.
  * Given the resource with logical ID `ImageBucket`, `BUCKET: !Ref ImageBucket` is the same as `BUCKET: ${ImageBucket}`.
    Similarly, `!GetAtt ImageBucket.WebsiteURL` is the same as `${ImageBucket.WebsiteURL}`.
  * Use `!sub` in the case of `ARN` construction and `!Ref` and `!GetAtt` in other cases.


