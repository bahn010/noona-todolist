import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import api from "./utils/api";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  }

  const addTask = async () => {
    const response = await api.post("/tasks", { task: todo, iscompleted: false });
    setTodoList([...todoList, response.data.data]);
    setTodo("");
    getTasks();
  }

  const updateTask = async (id) => {
    const response = await api.put(`/tasks/${id}`, { isCompleted: !todoList.find((item) => item._id === id).isCompleted });
    setTodoList(todoList.map((item) => item._id === id ? response.data.data : item));
    getTasks();
  }
  
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTodoList(todoList.filter((item) => item._id !== id));
    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>
      <TodoBoard todoList={todoList} updateTask={updateTask} deleteTask={deleteTask} />
    </Container>
  );
}

export default App;
