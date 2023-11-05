import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {PostDataApiCalls} from "../Services";
import { useNavigate } from 'react-router-dom';
function WriteBlog({handleClose}) {
    
const Navigate = useNavigate();

const handleSubmit = async (e)=>{
  e.preventDefault()
  const response = await PostDataApiCalls('add_blogs',formdata)
  if(response.message === 'Failed'){
    console.log(response)

  }  
  else{
    handleClose();
  }
}
let createdByUser=localStorage.getItem('user');
if(!createdByUser)
{
  createdByUser={_id:'2',name:'hi'}
}

  const[formdata,setformdata] = useState({createdBy:createdByUser._id,title:'',content:'',category:'',createdbyName:createdByUser.name})
   
  function add_data(data_type,data_val)
  {
    formdata[data_type] = data_val;
    setformdata(formdata);
    console.log(formdata);
    all_required();
  }
  const[button_disabled,setbutton] = useState(true);
  
  function all_required()
  {
    let a = false;
     for(const type in formdata)
     { 
      console.log(type," " ,formdata[type].length);
       if(formdata[type]?.length === 0)
       {
         a=true;
         break;
       }
       
     }
     setbutton(a);
  }

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
                    onChange = {(e)=>add_data('title',e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3} 
                    placeholder="Write your blog here"
                    autoFocus
                    onChange = {(e)=>add_data('content',e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Games"
              autoFocus
              Content = {(e)=>add_data('category',e.target.value)}
            >
            </Form.Control>
          </Form.Group>
                
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit} disabled={button_disabled}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

  )
}

export default WriteBlog