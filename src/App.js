import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'

function App() {
  let [items, updateItem] = useState(
    [
    {
      name: "item 1",
      description: "d"
    },
    {
      name: "item 2",
      description: "d"
    },
    {
      name: "item 3",
      description: "d"
    }
    ])

    

    let handleNewItem = (event, name) => {
      event.preventDefault();
      let newItem = {
        name: name,
        description: name
      }
      updateItem((oldItems) => {return oldItems.concat(newItem);})
    }

  return (
    <div className="App">
      <TodoList todoItems={items}/>
      <NewTodo addNewItem={handleNewItem}/>
    </div>
  );
}

// jsx

export default App;
