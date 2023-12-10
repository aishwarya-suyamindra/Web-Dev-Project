import { useNavigate } from "react-router-dom";

const VideoList = ({header, videoData}) => {
  const navigate = useNavigate()
  const handleThumbnailClick = videoId => {
    console.log('Play video:', videoId);
    navigate(`../video/${videoId}`, {state: {isUploadedVideo: false}})
  };

  return (
    <div>
      <h2>{header}</h2>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {videoData.map(video => (
          <div key={video.videoId} style={{ margin: '0 10px' }}>
            <img
              src={video.thumbnail.url}
              alt={video.title}
              style={{ width: video.thumbnail.width, height: video.thumbnail.height, cursor: 'pointer' }}
              onClick={() => handleThumbnailClick(video.videoId)}
            />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
