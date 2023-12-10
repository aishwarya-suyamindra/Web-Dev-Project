import React, { useState } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchText);
     // Call the remote API with searchText
    //onSearch(searchText);
  };

  return (
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
  );
};

export default SearchBar