import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import To_do from './components/To_do';
import NewTodo from './components/NewTodo';
import { Routes, Route, Link } from 'react-router-dom';
import Done from './components/Done';

function App() {
  const [items, setItems] = useState([
    { name: "item 1", description: "d", checked: false },
    { name: "item 2", description: "d", checked: false },
    { name: "item 3", description: "d", checked: false },
  ]);

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

  const handleNewItem = (event, name) => {
    event.preventDefault();
    const newItem = {
      name,
      description: name,
      checked: false,
    };
    setItems(oldItems => [...oldItems, newItem]);
  };

  const handleCheckChange = (index, isChecked) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].checked = isChecked;
      return newItems;
    });
  };

  const handleDelete = (index) => {
    setItems(prevItems => prevItems.filter((item, i) => i !== index));
  };

  return (
    <div className="App">
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
      </div>
      <Routes>
        <Route path="/done" element={<Done todoItems={items} onCheckChange={handleCheckChange} />} />
        <Route path="/to_do" element={<To_do todoItems={items} onCheckChange={handleCheckChange} />} />
        <Route path="/all" element={<TodoList todoItems={items} onCheckChange={handleCheckChange} onDelete={handleDelete} />} />
      </Routes>
      <NewTodo addNewItem={handleNewItem} />
    </div>
  );
}

export default App;
