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
  const response = await PostDataApiCalls('add_item',formdata)
  if(response.message === 'Failed'){
    console.log(response)
  }  
  else{
    handleClose();
    window.location.href = "/Home";
  }
}

  const[formdata,setformdata] = useState({product_title:'',description:'',price:'',image:'',category:'',status:'Not Sold',contact_no:''})
   
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
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="product title"
                autoFocus
                onChange={(e)=>add_data('product_title',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="email"
                placeholder="Write a short description about the product."
                autoFocus
                onChange={(e)=>add_data('description',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                autoFocus
                onChange={(e)=>add_data('price',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image Link</Form.Label>
              <Form.Control
                type="link"
                onChange={(e)=>add_data('image',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e)=>add_data('category',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact No</Form.Label>
              <Form.Control
                type="phone"
                autoFocus
                onChange={(e)=>add_data('contact_no',e.target.value)}
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

export default Sellitem;