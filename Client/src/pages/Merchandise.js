import React, { useState,useEffect } from "react";
// import merchandiseCard from "../components/merchandiseCard";
import Search from "../assets/Search.svg";
import plus from "../assets/plus.svg";
import AddMerchandise from "../components/AddMerchandise";
import {GetDataApiCalls} from "../Services";
// import ProfileCard from "../components/ProfileCard";
import MerchCardItem from "../components/merchitemcards";

export default function Home() {
  
  const[merchandiseData,setmerchandisedata] = useState([]);
  const [filtereddata, setFiltereddata] = useState([]);
  useEffect(()=>{
    async function fetchmerchandisedata(){
      let merchandise = await GetDataApiCalls('merchandise').then(
        (res) => {
          setmerchandisedata(res);
          setFiltereddata(res);
          console.log(res);
        }
       ).catch(err => {
        setmerchandisedata([]);
        setFiltereddata([]);
       });
      //  console.log(merchandise);
      //  setmerchandisedata(merchandise);
      //  setFiltereddata(merchandise);
      //  console.log(merchandiseData);
    }
    fetchmerchandisedata();
  },[])

  const [show, setShow] = useState(false);
 
  const SearchData = () => {
    const search = document.getElementById("search").value;
    const filtered = merchandiseData.filter(
      (item) =>
        item.product_title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFiltereddata(filtered);
  };
  const [SortText, setSortText] = useState("Sort by Price");

 
  
  const SortData = () => {
    let filter = [...merchandiseData];
    if (SortText === "Sort by Category") {
     filter.sort((a, b) => a.category.localeCompare(b.category));
      setSortText("Sort by Price");
    } else {
      filter.sort((a, b) => b.price - a.price);
      setSortText("Sort by Category");
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
      {show && <AddMerchandise handleClose={handleClose} />}
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
              Add Merchandise
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
          {/* {filtereddata.map((item, index) => (
            <ResearchCard key={index} data={item} />
          ))} */}
          {filtereddata.map((item, index) => (
            <MerchCardItem 
              title={item.product_title} 
              price={item.price} 
              description={item.description} 
              category={item.category} 
              image={item.image}/>
          ))}
        </div>
      </div>
    </div>
  );
}
