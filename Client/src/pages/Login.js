import React, { useState } from 'react'
import {PostDataApiCalls,SetItemLocalStorage} from "../Services";
import { useNavigate } from 'react-router-dom';
const SignIn =()=>{
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    // Add logic to check if the user exists in database or not
    e.preventDefault();
    const response = await PostDataApiCalls('signin',Formdata);
    if(response.message === 'Failed') {
     console.log(response)
    }
    else{
      SetItemLocalStorage('user',response);
     navigate('/Home');
     window.location.reload();
    }
  };
  const[Formdata,setformdata]=useState({email:'',password:''});
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
        <h3 className='Headin' style={{color:'#167bff'}}>CampusConnect</h3>
      <form  style={{width:'400px'}} className='FormPage'>
       
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange = {(e)=>ChangeData('email',e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange = {(e)=>ChangeData('password',e.target.value)}
          />
        </div>
        
        <div className="d-grid" onClick={handleSubmit}>
          <button type="submit" className="btn btn-primary" disabled = {disabled_button}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Create new account <a href="/signUp">sign up?</a>
        </p>
      </form>
      </div>
    )
  }
export default SignIn;