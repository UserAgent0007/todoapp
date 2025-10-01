import { useState } from 'react';

function NewTodo (props) {
    let [nameTracked, updateNameTracked] = useState("") 
    let [descriptionTracked, updateDescriptionTracked] = useState("") 


    let handleChangeText = (event) => {
      updateNameTracked(event.target.value)
    } 

    let handleNewItem = (event) => {
        props.addNewItem(event, nameTracked);
        updateNameTracked("");
    }

    return <div>
<form onSubmit={handleNewItem}>
        <input type="text" placeholder='name' 
        value={nameTracked} onChange={handleChangeText}/>

        {/* <input type="text" placeholder='description' value={itemTracked.description}/> */}
        <button>submit</button>
      </form>
    </div>
}

export default NewTodo;