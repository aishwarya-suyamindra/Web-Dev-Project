import 'ff'
export const generateThumbnailFromBuffer = (videoBuffer, callback, videoFormat) => {
    ffmpeg()
    .input(videoBuffer)
    .inputFormat(videoFormat)
    .on('end', () => {
      callback(null);
    })
    .on('error', (err) => {
      callback(err);
    })
    .screenshots({
      count: 1,
      size: '120x90', // Set the thumbnail size
      folder: '/path/to/thumbnail/directory',
      filename: 'thumbnail.png',
    });
}