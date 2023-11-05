import React, { useState , useEffect} from "react";
import ProfileCard from "../components/ProfileCard";
import Search from "../assets/Search.svg";
import plus from "../assets/plus.svg";
import Sellitem from "../components/Sellitem";
import {GetDataApiCalls} from "../Services";
export default function Home() {

  const [data,setdata] = useState([]);
  const [filtereddata, setFiltereddata] = useState(data);
  useEffect(()=>{
   async function fetchdata() {
    try{
      let api_data = await GetDataApiCalls('items/');
      console.log(api_data)
      if(api_data.message === 'Failed')
      api_data = [];
      setdata(api_data);
      console.log(api_data);
      setFiltereddata(api_data);
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
        item.product_title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFiltereddata(filtered);
  };


  const [SortText, setSortText] = useState("Sort by Price");

 
   
  const SortData = () => {
    let filter = [...data];
    if (SortText === "Sort by Price") {
     filter.sort((a, b) => a.price.localeCompare(b.department));
      setSortText("Sort by Category");
    } else {
      filter.sort((a, b) => b.category - a.category);
      setSortText("Sort by Price");
    }
    setFiltereddata(filter);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log(show);
    setShow(true);
  };
  return (
    <div className="container mt-3">
      {show && <Sellitem handleClose={handleClose} />}
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
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={SortData}
            >
              <div className="Box">{SortText}</div>
            </div>
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
              <img src={plus} style={{ width: "24px" }} />
              Sell
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
          {}
          {/* {filtereddata.map((item, index) => (
            <ProfileCard key={index} data={item} />
          ))} */}
        </div>
      </div>
    </div>
  );
}