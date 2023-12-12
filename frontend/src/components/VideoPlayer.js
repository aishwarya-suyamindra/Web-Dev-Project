import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import "../stylesheets/VideoPlayer.css"

const VideoPlayer = () => {
  const { id } = useParams()
  const location = useLocation();
  const [isUploadedVideo, setIsUploadedVideo] = useState(location.state.isUploadedVideo)

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  // setIsUploadedVideo(location.state.isUploadedVideo)
  const isSignedIn = useSelector((state) => state.session.authenticated)
  const user = useSelector((state) => state.login.userDetails)
  console.log(id)
  console.log(isUploadedVideo)
  console.log(isSignedIn)
  console.log(user)

  const BASE_REMOTE_URL =  process.env.REACT_APP_API_BASE || "http://localhost:3500"
  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      console.log("Inside fetchComments")
      try {
        const response = await axios.get(`${BASE_REMOTE_URL}/getComment/${id}`);
        console.log(response.data)
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  // Function to handle comment submission
  const handleCommentSubmit = async () => {
    console.log("Inside handleCommentSubmit")
    try {
      // Send a POST request to the /comments endpoint to add a new comment
      await axios.post(`${BASE_REMOTE_URL}/comment`, {
        videoId: id,
        userId: user.name, 
        comment: newComment,
      });

      // Fetch and update the comments after submitting a new comment
      const response = await axios.get(`${BASE_REMOTE_URL}/getComment/${id}`);
      console.log(response)
      setComments(response.data);

      // Clear the input field after submitting the comment
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <>
      <div className="video-player-container mt-5">
        {isUploadedVideo ?
          <video src={`${BASE_REMOTE_URL}/video/${id}`} width="560" height="315" controls />
          :
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
          ></iframe>}
      </div>
      
      {isSignedIn && (
        <div className="comment-section">
          <ul className="comment-list">
            {comments && comments.map(comment => (
              <li key={comment._id} className="comment-item">
                <span className="comment-author">{comment.userId}</span>
                <p className="comment-text">{comment.comment}</p>
              </li>
            ))}
          </ul>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
          
        </div>
      )}
      {!isSignedIn && (
        <div className="comment-section">
          <p>Login to comment.</p>
        </div>
      )
      }
    </>

  );
};

export default VideoPlayer;