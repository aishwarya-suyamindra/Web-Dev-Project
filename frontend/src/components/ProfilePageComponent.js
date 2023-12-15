import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  // State to store user information
  const currentUser = useSelector((state) => state.login.userDetails)
  const isSignedIn = useSelector((state) => state.session.authenticated)
  const BASE_REMOTE_URL = process.env.REACT_APP_API_BASE || "http://localhost:3500"
  var { userId } = useParams()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    followers: [],
    following: []
  });

  // Fetch user information from API
  useEffect(() => {
    userId = userId === undefined ? currentUser.userId : userId
    axios.get(`${BASE_REMOTE_URL}/profile/${userId}`)
      .then(response => {
        const data = response.data
        setUserData({
          name: data.fullName,
          email: data.email,
          followers: data.followers.map(x => ({
            name: x.name,
            userId: x.userId
          })),
          following: data.following.map(x => ({
            name: x.name,
            userId: x.userId
          }))
        })
      }).catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  // Function to handle form submission
  const handleFormSubmit = async(event) => {
    event.preventDefault();
    const data = {fullName: userData.name, email: userData.email, phone: userData.phone}
    console.log("!!",data)
    await axios.put(`${BASE_REMOTE_URL}/profile`, data, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + currentUser.token
  }})
    .then(response => {
      console.log("User updated successfully!")
    })
    .catch(error => {
      console.log(error.response.data);
    })
  };

  const handleFollow = async(event) => {
    const userIdToFollow = userId;
    const data = {userId: currentUser.userId, userIdToFollow: userId, username: userData.name}
    console.log(data)
    await axios.post(`${BASE_REMOTE_URL}/profile/followUser`, data)
    .then(response => {
      console.log("following!")
    })
    .catch(error => {
      console.log(error.response.data);
    })
  }

  return (
    <div>
      {currentUser.id === userId ?
        <div> 
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName" className='m-3'>
              <Form.Label className='mb-2'>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={userData.name}
                onChange={e => setUserData({ ...userData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className='m-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={e => setUserData({ ...userData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className='m-3'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={userData.phone}
                onChange={e => setUserData({ ...userData, phone: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className='m-3'>
              Update Profile
            </Button>
          </Form></div> : <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          <div><h2>{userData.name}</h2></div>
          {isSignedIn ?  <div>
            <Button onClick={handleFollow} >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Follow
              </Button>
          </div> : <div></div>}
         
        </div>
      }      

      <h3 className='m-3'>Following</h3>
      <ListGroup className='m-3'>
        {userData.following.map(followingUser => (
          <ListGroup.Item key={followingUser.userId}>
            {followingUser.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserProfile;



