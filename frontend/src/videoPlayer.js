import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const VideoPlayer = () => {
  const videoRef = useRef();
  const chunkSize = 1024 * 255; // Adjust the chunk size as needed

  useEffect(() => {
    let startByte = 0;

    const fetchVideoChunk = async () => {
      try {
        const response = await axios.get('http://localhost:3500/video/SQmDuhhwU', {
          responseType: 'arraybuffer',
          headers: { Range: `bytes=${startByte}-${startByte + chunkSize - 1}` },
        }); // Replace with your actual API endpoint

       // const blob = response.data;
        const blob = new Blob([response.data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        videoRef.current.src = url;

        startByte += chunkSize;
        // Continue fetching if not reached the end of the file
        const val = response.headers['content-range'].split('/')[1]
        if (startByte < val) {
          fetchVideoChunk();
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideoChunk();

    // return () => {
    //   // Cleanup
    //   if (videoRef.current) {
    //     URL.revokeObjectURL(videoRef.current.src);
    //   }
    // };
  }, []);

  return (
    <div>
      <video ref={videoRef} controls width="640" height="360">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
