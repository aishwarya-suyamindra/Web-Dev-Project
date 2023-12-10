import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Modal } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoUpload = ({ show, onHide }) => {
    const BASE_REMOTE_URL = "http://localhost:3500" 
    const [file, setFile] = useState(null);
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        description: ''
      })
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
             await handleUpload()
        } catch(error) {
            onHide()
            console.error('Error:', error);
        }
    }
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleUpload = async () => {
        const formData = new FormData();
            formData.append('video', file);
            const data = JSON.stringify({
                title: videoDetails.title,
                description: videoDetails.description,
            })
            formData.append('data', data)
            await axios.post(`${BASE_REMOTE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                const videoId = response.data.id
                setFile(null)
                console.log("Uploaded!", videoId)
                navigate(`../video/${videoId}`, {state: {isUploadedVideo: true}} )
            }).catch(error => {
                throw new Error(error)
            })
    };

    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">

            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Upload Video
                </Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input required type="text" value={videoDetails.title} class="form-control" id="title" placeholder="Video Title" onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}/>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Video Description</label>
                    <textarea required value={videoDetails.description} class="form-control" id="description" rows="3" onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}></textarea>
                </div>
                <div class="mb-3">
                    <label for="upload" class="form-label">Choose file</label>
                    <input required class="form-control" id="upload" type="file" onChange={handleFileChange} accept="video/*"/>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button type="submit" variant="primary" onClick={handleSubmit} disabled={!file}>Upload</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default VideoUpload;
