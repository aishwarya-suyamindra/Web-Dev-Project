import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import '../stylesheets/HomePageComponent.css'
import VideoList from './VideoList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoUpload from './VideoUpload';
import VideoDelete from './VideoDelete';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../Util/session';

const WelcomePage = () => {
  const BASE_REMOTE_URL = process.env.REACT_APP_API_BASE || "http://localhost:3500"
  const [videoData, setVideoData] = useState([]);
  const [customVideoData, setCustomVideoData] = useState([]);
  const user = useSelector((state) => state.login.userDetails)
  const isSignedIn = useSelector((state) => state.session.authenticated)
  const isAdmin = user.role == 'admin' ? true : false;
  console.log(user)
  useEffect(() => {
    axios.get(`${BASE_REMOTE_URL}/trending`)
      .then(response => {
        console.log(response.data)
        setVideoData(response.data)
      }
      )
      .catch(error => console.error('Error fetching video data:', error));
      const wordList = ['apple', 'banana', 'orange', 'grape', 'kiwi','cucumber','watermelon'];
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const searchText =  wordList[randomIndex];
      console.log(searchText)
      axios.get(`${BASE_REMOTE_URL}/searchBar/${searchText}`)
      .then(response => {
        console.log(response.data)
        setCustomVideoData(response.data)
      }
      )
      .catch(error => console.error('Error fetching video data:', error));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <div className="welcome-page ">
      {isSignedIn ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          <div></div>
          <div>
            <Link to="/home" style={{ textDecoration: 'none', color: 'blue' }}>
              <Button onClick={logout} >
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Logout
              </Button>

            </Link>
          </div>
        </div>
      ) : null}

      <Row className="justify-content-center align-items-center vh-40">
        <Col className="text-center">
          <h1>Welcome to Your Streaming Service</h1>
          <p className="lead">Unlimited access to thousands of videos!</p>

          {
            isSignedIn ?
              <div className="cta-buttons">
                <Link to="/profile">
                  <Button variant="primary" className="me-2">
                    Hi, {user.name}
                  </Button>
                </Link>

                <Button variant="success" className="me-2" onClick={() => setShowModal(true)}>
                  Upload Video
                </Button>
                <VideoUpload show={showModal} onHide={() => setShowModal(false)} />
              </div>

              :
              <div className="cta-buttons">
                <Link to="/register">
                  <Button variant="primary" className="me-2">
                    Register
                  </Button>
                </Link>

                <Link to="/login">
                  <Button variant="secondary" className="me-2">
                    Login
                  </Button>
                </Link>
              </div>

          }
          {isAdmin && isSignedIn ?
            <div className="cta-buttons">

              <Button variant="success" className="me-2" onClick={() => setShowModal2(true)}>
                Delete Video
              </Button>
              <VideoDelete show={showModal2} onHide={() => setShowModal2(false)} />
            </div>
            :
            <div className="cta-buttons">
            </div>
          }
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center m-5">
        <SearchBar />
      </Row>
      <Row>
        <VideoList header="Trending Videos" videoData={videoData} />
      </Row>
      {isSignedIn ?
        <Row>
          <VideoList header="Recommended Videos" videoData={customVideoData} />
        </Row>
        :
        <div className="cta-buttons">
        </div>
      }
    </div>
  );
};

export default WelcomePage;


