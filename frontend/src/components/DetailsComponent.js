import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup } from 'react-bootstrap';
import VideoPlayer from "./VideoPlayer";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { logout } from '../Util/session';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import "../stylesheets/VideoDetails.css"

const VideoDetails = () => {
    const BASE_REMOTE_URL = process.env.REACT_APP_API_BASE || "http://localhost:3500"
    const { id } = useParams()
    const navigate = useNavigate();
    const location = useLocation();
    const isSignedIn = useSelector((state) => state.session.authenticated)
    const user = useSelector((state) => state.login.userDetails)
    const [isUploadedVideo, setIsUploadedVideo] = useState(location.state.isUploadedVideo)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState()

    console.log(id)
    console.log(isUploadedVideo)

    useEffect(() => {
        // Load comments data
        if (comments.length === 0) {
            axios.get(`${BASE_REMOTE_URL}/comments/${id}`).then((response) => {
                const data = response.data
                setComments([...data]);
            })
        }       
    }, [])

    const handleAddComment = async () => {
        if (comment.trim() === '') { return }
        console.log(comment)
        await axios.post(`${BASE_REMOTE_URL}/comments/${id}`, {data: comment}, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        }).then(response => {
            // Add the comment to the local arr.
            console.log("Comment added!")
            console.log("Comments: user -", user.userId);
            setComment('')
            setComments([...comments, { name: user.name, text: comment, userId: user.userId }]);
        }).catch(error => {
            // Token expired, so log the user out 
            if (error.response.request.status === 403) {
                logout()
                alert("Session timed out, please login again.")
                navigate('../login')
            }
            alert('There was an error processing this request!')
            console.log(error)
            throw new Error(error)
        })
    }

    return (
        <>
            <VideoPlayer id={id} isUploadedVideo={isUploadedVideo} />
            <div className="comment-section">
                <InputGroup>
                <input required disabled={!isSignedIn} type="text" className="comment-input" placeholder={isSignedIn ? "Add a comment" : "Login to add a comment"} onChange={(e) => {
                    setComment(e.target.value)
                }} />

                <div className="float-end">
                {isSignedIn ?
                    <Button variant="success" className="me-2" onClick={handleAddComment}>
                        Add comment
                    </Button>
                : <div></div>}
                </div>
                </InputGroup>
               
               

                <div className="mt-3">
                <ul className="comment-list">
                    {comments.map((comment, index) => (
                        <li key={index} className="comment">
                            <div className="comment-user">
                                <FontAwesomeIcon icon={faUserCircle}/>
                                <span className="comment-username">
                                    <Link to={`/profile/${comment.userId}`}>{comment.name}</Link>
                                </span>
                            </div>
                            <div>{comment.text}</div>
                        </li>
                    ))}
                </ul>
                </div>
                
            </div>
        </>
    )

}

export default VideoDetails;

