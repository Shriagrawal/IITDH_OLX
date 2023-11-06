import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {PostDataApiCalls} from "../Services";
import { useNavigate } from 'react-router-dom';
function AddPublication({handleClose,fetchdata}) {
  const Navigate = useNavigate();

const handleSubmit = async (e)=>{
  e.preventDefault()
  const response = await PostDataApiCalls('add_events',formdata)
  if(response.message === 'Failed'){
    console.log(response)

  }  
  else{
    handleClose();
    fetchdata();
  }
}

let createdByUser=localStorage.getItem('user');
createdByUser=JSON.parse(createdByUser);
console.log(createdByUser);
if(!createdByUser)
{
  createdByUser={_id:'2',name:'hi'}
}

  const[formdata,setformdata] = useState({createdBy:createdByUser?.email,title:'',description:'',createdbyName:createdByUser?.name,image_link:'',payment_link:'',contact_no:''})
   
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
          <Modal.Title>Add Event Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of Event</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                autoFocus
                onChange={(e)=>add_data('title',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                autoFocus
                onChange={(e)=>add_data('description',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="url"
                placeholder="Image"
                autoFocus
                onChange={(e)=>add_data('image_link',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact no</Form.Label>
              <Form.Control
                type="url"
                placeholder="+91 1234567890"
                autoFocus
                onChange={(e)=>add_data('contact_no',e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Payment Link</Form.Label>
              <Form.Control
                type="link"
                autoFocus
                onChange={(e)=>add_data('payment_link',e.target.value)}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  disabled={button_disabled} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPublication;