import './navbar.css';
import { Segment, Header } from 'semantic-ui-react';
import React from 'react';

function Navbar() {
  return (
    <Segment
      id="navbar"
      attached
      inverted
      size="tiny"
      textAlign="left"
      color="blue"
    >
      <Header as="h1">Sorting algorithms App</Header>
      <p>© Paul Tortel</p>
    </Segment>
  );
}

export default Navbar;
