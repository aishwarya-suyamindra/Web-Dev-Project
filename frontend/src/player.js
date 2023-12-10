import React from 'react';
const Player = () => {
  const videoId = "e0R7FFsLi"
  return (
    <div>
      <h2>Video Player</h2>
      <video src={`http://localhost:3500/video/${videoId}`} width="800" height="400" controls />
    </div>
  );
}

export default Player;