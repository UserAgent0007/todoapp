function TodoList(props) {
    
    return (
        <div>
            <ul>
        {props.todoItems.map(x => <li>{x.name}</li>)}
      </ul>
        </div>
    )
}

export default TodoList;