import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Modal } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { logout } from '../Util/session';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const VideoDelete = ({ show, onHide }) => {
    const BASE_REMOTE_URL =  process.env.REACT_APP_API_BASE || "http://localhost:3500"
    const user = useSelector((state) => state.login.userDetails)
    const [videoDetails, setVideoDetails] = useState({
        title: ''
      })
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
             await handleDelete()
        } catch(error) {
            onHide()
            console.error('Error:', error);
        }
    }
    

    const handleDelete = async () => {
            console.log("handleDelete" + videoDetails.title)
            await axios.post(`${BASE_REMOTE_URL}/delete`, {data: videoDetails.title}, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            }).then(response => {
                if (response.data.success) {
                    console.log("Deleted!");
                  }
                  navigate('/')
            }).catch(error => {
                // Token expired, so log the user out 
                if (error.response.request.status === 403) {
                    logout()
                    alert("Session timed out, please login again.")
                    navigate('../login')
                }
                console.log(error)
                throw new Error(error)
            })
    };

    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">

            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Delete Video
                </Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input required type="text" value={videoDetails.title} class="form-control" id="title" placeholder="Video Title" onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}/>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button type="submit" variant="primary" onClick={handleSubmit} >Delete</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default VideoDelete;
