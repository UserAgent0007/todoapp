import './toDoList.css'

function TodoList({ todoItems, onCheckChange, onDelete }) {
  return (
    <div>
      <ul>
        {todoItems.map((item, index) => (
          <li key={index} class="list_style_to_do">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => onCheckChange(index, e.target.checked)}
            />
            {item.name_task}
            <p>{item.description}</p>

            <button class="delete-button" onClick={() => onDelete(index)}>Видалити</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default TodoList;
