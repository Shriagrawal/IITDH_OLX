import React, { useState,useEffect } from "react";
import PublicationCard from "../components/PublicationCard";
import Search from "../assets/Search.svg";
import plus from "../assets/plus.svg";
import AddEvents from "../components/AddEvents";
import {publicationData} from "../DumyData";
import {GetDataApiCalls} from "../Services";
import CardItem from "../components/eventitemcards";


export default function Events() {

  const[publicationData,setpublicationData] = useState([]);
  const [filtereddata, setFiltereddata] = useState(publicationData);
  useEffect(()=>{
    async function fetcheventsedata(){
      let events = await GetDataApiCalls('event_donations').then(
        (res) => {
          setFiltereddata(res);
          console.log(res);
        }
       ).catch(err => {
        setFiltereddata([]);
       });
      //  console.log(merchandise);
      //  setmerchandisedata(merchandise);
      //  setFiltereddata(merchandise);
      //  console.log(merchandiseData);
    }
    fetcheventsedata();
  },[]);


  const [show, setShow] = useState(false);
  const SearchData = () => {
    const search = document.getElementById("search").value;
    const filtered = publicationData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );
    setFiltereddata(filtered);
  };
  const [SortText, setSortText] = useState("Sort by Departmant");

  async function fetch_department_sorted_for_publication()
  {
      let data  = await fetch('api')
      data = await data.json();
      setFiltereddata(data);
  }
  const SortData = () => {
    let filter = [...publicationData];
    if (SortText === "Sort by Department") {
      fetch_department_sorted_for_publication()
      setSortText("Sort by Performance Score");
    } else {
      filter.sort((a, b) => b.performance_score - a.performance_score);
      setSortText("Sort by Department");
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
      {show && <AddEvents handleClose={handleClose} />}
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
              padding: "10px 14px",
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
              <img src={plus} style={{ width: "24px" }} />
              Add Donation for Events
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
            <CardItem title={item.title} 
            venue={item.venue}
              link={item.link}
              image={item.image}
              />
          ))}
        </div>
      </div>
    </div>
  );
}
