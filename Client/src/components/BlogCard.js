import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Publication({ data }) {
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <Card style={{ maxWidth: '400px', margin: '20px' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '1.5rem' }}>{data.title}</Card.Title>
        <Card.Text>
          By {data.createdbyName}
        </Card.Text>
        <Card.Text>{data.content}</Card.Text>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button variant="primary" onClick={handleLikeClick}>
            Like
          </Button>
          <span style={{ fontSize: '1.2rem' }}>
            {likes} {likes === 1 ? 'Like' : 'Likes'}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Publication;
