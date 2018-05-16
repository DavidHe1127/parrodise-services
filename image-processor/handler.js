const Sharp = require('sharp');
const Types = require('./src/types');
const ImageFetcher = require('./src/s3ImageFetcher');
const ImageResizer = require('./src/ImageResizer');

module.exports.processImage = (event, context, callback) => {

  console.log('xcxccxcc');

  const imageFetcher = new ImageFetcher(process.env.BUCKET);
  const imageResizer = new ImageResizer(Types, Sharp);

  const fileName = event.queryStringParameters && event.queryStringParameters.f;
  const status = event.queryStringParameters && 'status' in event.queryStringParameters;
  const quality = event.queryStringParameters && +event.queryStringParameters.q || 100;
  const type = event.queryStringParameters && event.queryStringParameters.t;

  const size = {
    w: event && +event.queryStringParameters.w || null,
    h: event && +event.queryStringParameters.h || null,
  };

  if (process.env.DEBUG) {
    console.log('bucketName:', imageFetcher._bucketName);
    console.log('fileName:', fileName);
  }

  if (!!status) {
    return callback(null, {
      statusCode: 200,
      body: displayStatus(),
    });
  }

  return imageFetcher.fetchImage(fileName)
    .then(data => {
      return imageResizer.resize(data.image, size, quality, 'image/png')
    })
    .then(data => {
      const contentType = data.contentType;
      const img = new Buffer(data.image.buffer, 'base64');

      callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' },
        body: img.toString('base64'),
        isBase64Encoded: true
      });
    })
    .catch(error => {
      console.error('Error:', error);
      callback(null, error);
    });
};
