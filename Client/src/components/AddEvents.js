import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {PostDataApiCalls} from "../Services";
import { useNavigate } from 'react-router-dom';

function AddEvents({handleClose}) {

  const Navigate = useNavigate();
const handleSubmit = async (e)=>{
  e.preventDefault()
  const response = await PostDataApiCalls('add_event_donations',formdata).then((res)=>{
    // console.log(res);
      // Navigate('/Merchandise');
    window.location.href = "/Events";
  }).catch(err=>{
    console.log(err.message) ;
  });
}

  const[formdata,setformdata] = useState({title:'',venue:'',link:'',image:''})
   
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
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={(e)=>add_data('title',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Venue Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e)=>add_data('venue',e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Payment Link</Form.Label>
              <Form.Control
                type="link"
                onChange={(e)=>add_data('link',e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image Link</Form.Label>
              <Form.Control
                type="link"
                onChange={(e)=>add_data('image',e.target.value)}
              />
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

export default AddEvents;