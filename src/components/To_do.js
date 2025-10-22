import './toDoList.css'

function To_do({ todoItems, onCheckChange }) {
  return (
    <div>
      <ul>
        {todoItems
          .map((item, originalIndex) => ({ item, originalIndex }))
          .filter(({ item }) => !item.checked)
          .map(({ item, originalIndex }) => (
            <li key={originalIndex}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => onCheckChange(originalIndex, e.target.checked)}
              />
              {item.name}
              <p>{item.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default To_do;
