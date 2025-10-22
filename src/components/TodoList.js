import './toDoList.css'

function TodoList({ todoItems, onCheckChange, onDelete }) {
  return (
    <div>
      <ul>
        {todoItems.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => onCheckChange(index, e.target.checked)}
            />
            {item.name}
            <p>{item.description}</p>

            <button onClick={() => onDelete(index)}>Видалити</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default TodoList;
