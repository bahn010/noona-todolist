import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, updateTask , deleteTask}) => {
  return (
    <div>
      <h2>To Do List</h2>
      {todoList && todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem key={item._id} item={item} updateTask={updateTask} deleteTask={deleteTask} />
        ))
      ) : (
        <p>할일이 없습니다.</p>
      )}
    </div>
  );
};

export default TodoBoard;
