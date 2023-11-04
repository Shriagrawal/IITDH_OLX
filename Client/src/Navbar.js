import React from 'react';
import { Link } from 'react-router-dom';

import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/Home" className="navbar-brand" style={{ display: 'flex', gap: '8px' }}>
          {/* <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAaCAMAAADhRa4NAAAAP1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC6E+JdAAAAFXRSTlMATl0OLf8YItgofYzJ57U5oUQGcGhgoUpoAAABI0lEQVR4AY3PB4LEIAgF0A8KGI2jRO9/1k2yffqzd8EVYjwUIgARAFFxj0laskixJPH+DSIrasVFxHBXkgJVZEm4pWtNgAJntdbVbo9LAxaRCES5d4lIxfH+BagiuNKzIkkNLkJbkoQw+nUElXyVYpZlJU8iij/yGJN7Mpw0deYxMn6R7NIojB2XucqO8QePvN9RigOtnPLEHwHYWq5p+obZZZ0RgOJGTEJFLgGPTZGIxwKwbOHs3NJWWh+eW89jFDVc24IGsxCCRtO9+b32sJ2wpy/hrA44BDMnXZiYiLSpLUEXs99btPQyZ8kljz459zK8c+kNb9mmMxmTj8bmNJzdqXnk7M2JAuDupM1bc1dXo7bz4S3yQk4blkM86z8d+5n4AFnmDsTLM5lkAAAAAElFTkSuQmCC"
            alt="IIT Dharwad Logo"
          /> */}
          <svg style={{marginTop: '8px'}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          </svg>
          CampusConnect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <ul className="navbar-nav ml-auto"> {/* Add 'ml-auto' to align items to the right */}
            <li className="nav-item">
              <Link to="/Merchandise" className="nav-link">
                Merchandise
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Events" className="nav-link">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Alumni" className="nav-link">
                Connect to Alumni
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/Contact" className="nav-link">
                Contact Us
              </Link>
            </li> */}
          </ul>
         
              <Link to="/Profile" className="nav-link">
                <div style={{background: 'black', width: '30px',borderRadius: '30px',height:'30px',justifyContent:'center',display:'flex'}}>
                  <svg style={{marginTop: '5px'}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                  </svg>
                </div>
               {/* <img src='./assets/Gmail.svg' style={{background: 'black', width: '48px',borderRadius: '48px',height:'48px'}} ></img> */}
              </Link>
           
        </div>
      </div>
    </nav>
  );
};

export default Navbar;