import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function WriteBlog({handleClose}) {
  return (
        <>
          <Modal show='true' centered='true'>
            <Modal.Header closeButton onClick={handleClose}>
              <Modal.Title>Add Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Blog Title"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3} 
                    placeholder="Write your blog here"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Games"
              autoFocus
            >
            </Form.Control>
          </Form.Group>
                
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

  )
}

export default WriteBlog