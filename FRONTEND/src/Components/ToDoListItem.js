import React from "react"

function ToDoListItem(props){

    return(
        <div onClick={()=>props.handleDelete(props.id)}>
           <li>
               {props.value}
           </li>
        </div>
    )
}

export default ToDoListItem