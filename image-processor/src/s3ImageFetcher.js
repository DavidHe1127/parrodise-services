const AWS = require('aws-sdk');

const checkS3 = (s3, bucketName, fileName) =>
  new Promise((resolve, reject) => {
    s3.headObject(
      {
        Bucket: bucketName,
        Key: fileName
      },
      (err, metadata) => {
        if (err && ['NotFound', 'Forbidden'].indexOf(err.code) > -1) {
          return reject(err.code);
        } else if (err) {
          return reject(err);
        }
        return resolve(metadata);
      }
    );
  });

const getS3 = (s3, bucketName, fileName) =>
  new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: bucketName,
        Key: fileName
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }

        const contentType = data.ContentType;
        const image = data.Body;

        return resolve({ image, contentType });
      }
    );
  });

class ImageFetcher {
  constructor (bucketName) {
    this._S3 = new AWS.S3();
    this._bucketName = bucketName;
  }

  fetchImage (fileName) {
    if (!fileName) {
      return Promise.reject(new Error('Filename not specified'));
    }

    return Promise.resolve(checkS3(this._S3, this._bucketName, fileName))
      .then(metadata => {
        if (!metadata) {
          throw new Error('Invalid File');
        }
      })
      .then(() => Promise.resolve(getS3(this._S3, this._bucketName, fileName)));
  }
}

module.exports = ImageFetcher;
