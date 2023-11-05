import React, { useState,useEffect } from "react";
import PublicationCard from "../components/PublicationCard";
import Search from "../assets/Search.svg";
import plus from "../assets/plus.svg";
import AddAlumni from "../components/AddAlumni";
import {GetDataApiCalls} from "../Services";

export default function Alumni() {

  const[publicationData,setpublicationData] = useState([]);
  const [filtereddata, setFiltereddata] = useState(publicationData);
  useEffect(()=>{
    async function publication(){
    let all_user_data = await GetDataApiCalls('users');
    setpublicationData(all_user_data);
    setFiltereddata(all_user_data);
    }    
   publication();
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
      {show && <AddAlumni handleClose={handleClose} />}
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
            <PublicationCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
