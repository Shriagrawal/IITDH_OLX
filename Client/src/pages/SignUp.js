import React, {useState}from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {PostDataApiCalls} from "../Services";
import { useNavigate } from 'react-router-dom';
const SignUp =()=>{
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await PostDataApiCalls('signup',Formdata);
     if(response.message === 'Failed') {
      console.log(response)
     }
     else{
      navigate('/Home');
      window.location.reload();
     }
  };

  const[Formdata,setformdata]=useState({name:'',email:'',phoneNo:'',password:'',department:'',linkdin:''});
  function ChangeData(type,value)
  {
    Formdata[type] = value;
    setformdata(Formdata);
    console.log(Formdata);
    changeofstate();
  }
  
  const [disabled_button,setbutton] = useState(true);
  function changeofstate()
  { 
    let a = false;
     for(const type in Formdata)
     { console.log(type,Formdata[type].length)
      if(Formdata[type].length === 0 )
        { a = true;
          break;
        }
     }
    setbutton(a)
  }

    return (
      <div className='LandingPage'>
         <h3 className='Headin' style={{color:'#167bff'}}>CampusConnect Profile</h3>
         <Form style={{width: "400px"}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                onChange = {(e)=>ChangeData('name',e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange = {(e)=>ChangeData('email',e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="link"
                placeholder="https://example.image"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>DepartMent</Form.Label>
              <Form.Control
                type="text"
                placeholder="Electrical"
                onChange = {(e)=>ChangeData('department',e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange = {(e)=>ChangeData('password',e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="tel"
                onChange = {(e)=>ChangeData('phoneNo',e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>linkdin URL</Form.Label>
              <Form.Control
                type="text"
                onChange = {(e)=>ChangeData('linkdin',e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSubmit} disabled = {disabled_button} >
            Submit
           </Button>
      </div>
    )
}
export default SignUp;