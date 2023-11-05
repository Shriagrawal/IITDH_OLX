import React, { useState,useEffect } from "react";
import ResearchCard from "../components/ResearchCard";
import Search from "../assets/Search.svg";
import {researchData} from "../DumyData";
import plus from "../assets/plus.svg";
import AddMerchandise from "../components/AddMerchandise";


export default function Home() {
  
  const[researchData,setResearchdata] = useState([]);
  const [filtereddata, setFiltereddata] = useState(researchData);
  useEffect(()=>{
    // async function fetchresearchdata(){
    //    let api_research_data = await fetch('http://127.0.0.1:8000/All_Research');
    //    api_research_data = await api_research_data.json();
    //    console.log(api_research_data)
    //    setResearchdata(api_research_data);
    //    setFiltereddata(api_research_data);
    // }
    // fetchresearchdata();
  },[])

  const [show, setShow] = useState(false);
  const SearchData = () => {
    const search = document.getElementById("search").value;
    const filtered = researchData.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.profName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltereddata(filtered);
  };
  const [SortText, setSortText] = useState("Sort by Price");

  async function fetch_Faculty_by_deaprtment_research(){
    // let data = await fetch('Faculty_by_deaprtment_research');
    // data = await data.json();
    // console.log(data);
    // setFiltereddata(data);
  }
  const SortData = () => {
    let filter = [...researchData];
    if (SortText === "Sort by Price") {
      fetch_Faculty_by_deaprtment_research();
      setSortText("Sort by Rating");
    } else {
      filter.sort((a, b) => b.performance_score - a.performance_score);
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
          {filtereddata.map((item, index) => (
            <ResearchCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
