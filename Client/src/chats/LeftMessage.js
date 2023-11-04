import React from "react";
export default function LeftMessage(props) {

return(

<div class="row no-gutters">
                <div class="col-md-3">
                <div class="chat-bubble chat-bubble--left">
                   {props?.message}
                </div>
                </div>
            </div>
)
}