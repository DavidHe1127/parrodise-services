class ImageResizer {
  constructor (Types, Sharp) {
    this.types = Types;
    this.sharp = Sharp;
  }

  getImageType (type, def = 'webp') {
    const found = this.types.find(item => item.sharp === type);

    if (!found && type === def) {
      return { sharp: def, contentType: `image/${def}` };
    }

    return found || this.getImageType(def, def);
  }

  resize (image, size, quality, type) {
    if (!image) throw new Error('An Image must be specified');
    if (!size) throw new Error('Image size must be specified');

    const sharpType = this.getImageType(type, 'webp');

    return new Promise((resolve, reject) => {
      this.sharp(image)
        .resize(size.w, size.h)
        .max()
        ['png']({ quality: quality })
        .toBuffer()
        .then(data => {
          return resolve({
            image: data,
            contentType: sharpType.contentType
          });
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = ImageResizer;
