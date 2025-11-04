import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import To_do from './components/To_do';
import NewTodo from './components/NewTodo';
import { Routes, Route, Link } from 'react-router-dom';
import Done from './components/Done';
import Login from './components/authorization/Login.js';
import LogOut from './components/authorization/Logout.js';
import Register from './components/authorization/Register.js';

function App() {
  // const [items, setItems] = useState([
  //   { name: "item 1", description: "d", checked: false },
  //   { name: "item 2", description: "d", checked: false },
  //   { name: "item 3", description: "d", checked: false },
  // ]);

  const [items, setItems] = useState([]);
  const url = "http://localhost:3000/";

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuth() {

    try {
      const res = await fetch(url + 'auth/check', { credentials: 'include' });
      if (res.status == 200) {
        setIsAuthenticated(true);
      } else {
        console.log("RIGHT WAY");
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);

    }
  }

  useEffect (()=>{
    checkAuth();
  }, [])

  const fetchItems = async () => {
    const response = await fetch('http://localhost:3000/', { credentials: "include" });

    if (response.ok){
      const data = await response.json();
      setItems(data);
    }
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
  }, [isAuthenticated]);

  // console.log(items)

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0
  });

  // useEffect для оновлення підрахунків при зміні items
  useEffect(() => {
    const total = items.length;
    const completed = items.filter(item => item.checked).length;
    const active = items.filter(item => !item.checked).length;

    setStats({
      total,
      completed,
      active
    });
  }, [items]);

  const handleNewItem = async (event, name1) => {
    event.preventDefault();
    // console.log("here");
    const newItem = {
      name_task: name1,
      description: name1,
      checked: false,
    };
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(newItem),
    })
      .catch((err) => {

        console.log("error oqured during fetchig (Post request)");
      });

    await fetchItems();

    // setItems(oldItems => [...oldItems, newItem]);
  };

  const handleCheckChange = async (index, isChecked) => {
    console.log(index)
    const id_to_update = items[index]._id;
    console.log(id_to_update);
    const updatedItem = items[index];
    const body_to_upd = {
      checked: isChecked
    };

    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].checked = isChecked;
      return newItems;
    });

    try {
      const response = await fetch(`http://localhost:3000/${id_to_update}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(body_to_upd)
      });

      if (!response.ok) {
        throw new Error("failed request put");
      }



      const result = await response.json();

      console.log("Succsessfull update", result);
    }
    catch (err) {
      console.log("fail " + err.message)
      setItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index].checked = !isChecked;
        return newItems;
      });
    }

  };

  const handleDelete = async (index) => {
    let id_to_delete = items[index]._id;
    const deletedItem = items[index];

    setItems(prevItems => prevItems.filter((item, i) => i !== index));
    await fetch(`http://localhost:3000/${id_to_delete}`, {
      method: "DELETE",
      credentials: "include"
    })
      .catch((err) => {
        setItems(prevItems => [...prevItems.slice(0, index), deletedItem, ...prevItems.slice(index)]);
        console.log("failed to delete");
      });

  };

  if (!isAuthenticated){
    return (
      
      <div>
        <div  class="links">
          <p>
            <Link to="/login">Log-in</Link>
          </p>
          <p>
            <Link to="/register">Register</Link>
          </p>
        </div>
        
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated = {setIsAuthenticated} />} />
        </Routes>
      </div>
      
    )
  }

  return (
    <div className="App">
      <div>
        <p>Welcome, {localStorage.getItem('name')}</p>
        
      </div>
      <div class="stats-container">
        <div class="stat-item">
          <h3>Всього завдань</h3>
          <p class="stat-number">{stats.total}</p>
        </div>
        <div class="stat-item">
          <h3>Виконано</h3>
          <p class="stat-number">{stats.completed}</p>
        </div>
        <div class="stat-item">
          <h3>Активних</h3>
          <p class="stat-number">{stats.active}</p>
        </div>
      </div>
      <div class="links">
        <p>
          <Link to="/all">Всі завдання</Link>
        </p>
        <p>
          <Link to="/to_do">Активні завдання</Link>
        </p>
        <p>
          <Link to="/done">Виконані завдання</Link>
        </p>
        <p>
          <Link to="/log_out">Log-out</Link>
        </p>
      </div>
      <Routes>
        <Route path="/done" element={<Done todoItems={items} onCheckChange={handleCheckChange} />} />
        <Route path="/to_do" element={<To_do todoItems={items} onCheckChange={handleCheckChange} />} />
        <Route path="/all" element={<TodoList todoItems={items} onCheckChange={handleCheckChange} onDelete={handleDelete} />} />
        <Route path="/login" element={<Login setIsAuthenticated = {setIsAuthenticated} />} />
        <Route path="/log_out" element={<LogOut setIsAuthenticated={setIsAuthenticated}/>} />
      </Routes>
      <NewTodo addNewItem={handleNewItem} />
    </div>
  );
}

export default App;
