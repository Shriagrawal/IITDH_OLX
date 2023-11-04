import React from "react";
export default function RightMessage(props) {

return(

<div class="row no-gutters">
                <div class="col-md-3 offset-md-9">
                <div class="chat-bubble chat-bubble--right">
                {props?.message}
                </div>
                </div>
            </div>)
}