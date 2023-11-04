import React from "react";
import "./chat.css";
import RightMessage from "./RightMessage";
import LeftMessage from "./LeftMessage";
import SettingTray from "./SettingTray";
import UserListCard from "./UserListCard";
export default function ChatBox() {

    return(
        <div className="container2">
        <div className="row no-gutters">
        <div className="col-md-4 border-right">
            <div className="settings-tray">
            <img className="profile-image2" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img"/>
            <span className="settings-tray--right">
                {/* <i className="material-icons">cached</i>
                <i className="material-icons">message</i>
                <i className="material-icons">menu</i> */}
            </span>
            </div>
            <div className="search-box">
            <div className="input-wrapper">
            🔍
                <input placeholder="Search here" type="text"/>
            </div>
            </div>
           
            <div className="message-holder" style={{width:'100%'}}>
                <UserListCard data={{name:"Robocop",lastMessage:"Hello",time:"12:00",image:"https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"}}/>
            </div>
        </div>
        <div className="col-md-8">
            
            <SettingTray/>
            <div className="chat-panel">
                <div className="message-holder">
                    <RightMessage message="Hello!"></RightMessage>
                    <LeftMessage message="Hello Bro!"></LeftMessage>
                </div>
            <div className="row">
                <div className="col-12">
                <div className="chat-box-tray">
                    <button className="attachbutton">📎</button>
                    <input type="text" placeholder="Type your message here..."/>
                    <button className="sendbutton" >📨</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}