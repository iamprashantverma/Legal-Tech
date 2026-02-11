const cloudinary = require("cloudinary").v2;
const stream = require("stream");

async function uploadToCloudinary(buffer, publicId, folder) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "raw",
        timeout: 120000
      },
      (err, result) => (err ? reject(err) : resolve(result))
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  });
}

module.exports = { uploadToCloudinary };
