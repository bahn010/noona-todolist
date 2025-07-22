import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, updateTask, deleteTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isCompleted ? 'completed' : ''}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={() => deleteTask(item._id)}>삭제</button>
            {!item.isCompleted && (
              <button className="button-delete" onClick={() => updateTask(item._id)}>
                끝남
              </button>
            )}
            {item.isCompleted && (
              <button className="button-cancel" onClick={() => updateTask(item._id)}>
                취소
              </button>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
