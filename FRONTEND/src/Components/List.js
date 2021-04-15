import React , {useEffect} from "react"
import axios from "axios"
import ToDoListItem from "./ToDoListItem"

function List(){
    const [item,setNewItem] = React.useState("");
    const [itemArray,setItemArray] = React.useState([])
    const [alert, setAlert] = React.useState(true);

    useEffect(()=>{
        let mounted = true;
        console.log(alert);
        if(!alert){
            return;
        }
        axios.get('https://to-do-list008.herokuapp.com/list/')
             .then(items=>{
                setItemArray(items.data);
             })
            return () => mounted=false;
    },[alert])

    useEffect(()=>{
        if(alert){
            setAlert(false);
        }
    },[alert])

    function handleOnClick(){
        const nayaItem = {
            listItem:item
        }
        axios.post("https://to-do-list008.herokuapp.com/list/add",nayaItem)
            .then(()=>{
                setNewItem("");
                setAlert(true);
            })
    }

    function handleOnChange(event){
        const newItem = event.target.value;
        setNewItem(newItem);
    }

    function deleteItem(id){
        axios.delete("https://to-do-list008.herokuapp.com/list/"+id)
            .then(()=>{
                setAlert(true);
            })
    }

    return(
        <div>
            <div className="form">
                <input type="text" onChange={handleOnChange} value={item}></input>
                <button onClick={handleOnClick}>
                   <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {itemArray.map((it)=>{
                        return(
                            <ToDoListItem key={it._id} id={it._id} value={it.listItem} handleDelete={deleteItem} />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default List