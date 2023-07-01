import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const resizeVideo = async (videoFile, maxWidth, maxHeight) => {
  const ffmpeg = createFFmpeg({
    log: true,
  });
  await ffmpeg.load();

  // Read the input video file
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

  // Resize the video using FFmpeg command
  await ffmpeg.run(
    '-i',
    'input.mp4',
    '-vf',
    `scale=${maxWidth}:${maxHeight}`,
    'output.mp4'
  );

  // Fetch the resized video file
  const resizedVideo = ffmpeg.FS('readFile', 'output.mp4');

  // Clean up
  ffmpeg.FS('unlink', 'input.mp4');
  ffmpeg.FS('unlink', 'output.mp4');

  return new Blob([resizedVideo.buffer], { type: 'video/mp4' });
};

export { resizeVideo };
