import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormControl, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const navigate = useNavigate()
  const BASE_REMOTE_URL = "http://localhost:3500" // move this to env.
  const [searchText, setSearchText] = useState('');
  const [videoData, setVideoData] = useState([]);

  const handleSearch = () => {
    console.log('Searching for:', searchText);
     // Call the remote API with searchText
    //onSearch(searchText);
    axios.get(`${BASE_REMOTE_URL}/searchBar/${searchText}`)
      .then(response => {
        console.log(response.data)
        setVideoData(response.data)
      }
      )
      .catch(error => console.error('Error fetching video data:', error));
  };

  const handleListItemClick = (videoId,isUploadedVideo) => {
    console.log(isUploadedVideo)
    navigate(`../video/${videoId}`, {state: {isUploadedVideo: isUploadedVideo}})
  };

  return (
    <div>
    <Form inline>
        <InputGroup>
        <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button variant="outline-success" onClick={handleSearch}> <FontAwesomeIcon icon={faSearch}/>
      </Button>
        </InputGroup>
    </Form>
    {videoData.length > 0 && (
        <ListGroup>
        {videoData.map(video => (
          <ListGroup.Item
            key={video.videoId}
            action
            onClick={() => handleListItemClick(video.videoId,video.isUploadedVideo)}
          >
            {video.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      )}
    </div>
  );
};

export default SearchBar