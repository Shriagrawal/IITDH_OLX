import React from "react";
export default function UserListCard(props) {

return(
    <>
<div class="friend-drawer friend-drawer--onhover">
<img class="profile-image2" src={props?.data?.image} alt=""/>
<div class="text">
    <h6>{props?.data?.name}</h6>
    <p class="text-muted">{props?.data?.lastMessage}</p>
</div>
<span class="time text-muted small">{props?.data?.time}</span>
</div>
<hr/>
</>)
}