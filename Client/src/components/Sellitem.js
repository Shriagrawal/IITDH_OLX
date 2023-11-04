import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {PostDataApiCalls} from "../Services";
import { useNavigate } from 'react-router-dom';



function Sellitem({handleClose}) {

  
const Navigate = useNavigate();
const handleSubmit = async (e)=>{
  e.preventDefault()
  const response = await PostDataApiCalls('add_faculty',formdata)
  if(response.message === 'Failed'){
    console.log(response)
  }  
  else{
    Navigate('/Home')
    handleClose();
  }
}

  const[formdata,setformdata] = useState({name:'k',email:'k',phoneNo:'k',password:'k',department:'k'})
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
       if(formdata[type].length === 0)
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
          <Modal.Title>Sell item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                onChange={(e)=>add_data('name',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e)=>add_data('email',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="link"
                placeholder="https://example.image"
                autoFocus
                // onChange={(e)=>add_data('email',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Electrical"
                autoFocus
                onChange={(e)=>add_data('department',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoFocus
                onChange={(e)=>add_data('password',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="tel"
                autoFocus
                onChange={(e)=>add_data('phoneNo',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          autoFocus
        >
          <option value="Active">Permanent</option>
          <option value="Inactive">Temporary</option>
          <option value="Inactive">Assistant</option>
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
  );
}

export default Sellitem;