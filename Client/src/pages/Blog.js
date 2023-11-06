import React, { useState , useEffect} from "react";
// import PublicationCard from "../components/PublicationCard";
import Search from "../assets/Search.svg";
// import plus from "../assets/plus.svg";
// import Sellitem from "../components/Sellitem";
import {GetDataApiCalls} from "../Services";
import WriteBlog from "../components/writeBlog";
import CardItem from "../components/blogitemcards";

export default function Blog() {

  const [data,setdata] = useState([]);
  const [filtereddata, setFiltereddata] = useState([]);
  useEffect(()=>{
   async function fetchdata() {
    try{
      let blogs = await GetDataApiCalls('blogs/');
      if(blogs.message === 'Failed')
      blogs = [];
      setdata(blogs);
      console.log(blogs);
      setFiltereddata(blogs);
    }
    catch(error)
    {
      console.log(error);
    }
    }
    fetchdata();
  },[]);

  const [show, setShow] = useState(false);
  
  const SearchData = () => {
    const search = document.getElementById("search").value;
    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFiltereddata(filtered);
  };

 
  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log(show);
    setShow(true);
  };
  return (
    <div className="container mt-3">
      {show && <WriteBlog handleClose={handleClose} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
            justifyContent: "space-between",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "320px",
              height:'50px',
background:'#fff',
borderRadius: "var(--radius-medium, 8px)",
border: "1px solid var(--gray-300, #D0D5DD)",
              alignItems: "center",
              gap: "8px",
              alignSelf: "stretch",
              justifyContent: "center",
              borderRadius: "var(--radius-medium, 8px)",
              background: "#fff",
            }}
            className="container_Style"
          >
            <img src={Search} alt="Search Icon" style={{ width: "24px" }} />
            <input
              type="text"
              style={{
                border: "none",
                width: "100%",
              }}
              id="search"
              onChange={SearchData}
              placeholder="Search by Name, Email"
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
           
            <div
              style={{
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#167bff",
                color: "white",
                cursor: "pointer",
              }}
              className="Box"
              onClick={handleShow}
            >
              Write a Blog
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {filtereddata.map((item, index) => (
            <CardItem title={item.title} content={item.content} category={item.category} name={item.createdbyName}/>
          ))}
        </div>
      </div>
    </div>
  );
}