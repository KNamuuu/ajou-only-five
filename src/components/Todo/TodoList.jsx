import React, { useState } from "react";
import TodoBlock from "./TodoBlock";
import TodoTitle from "./TodoTitle";

function TodoList(props) {
  const [todoData] = useState(props.data);

  const createNewContent = async () => {};

  return (
    <div className="todo-title-list">
      {todoData.map((el, i) => {
        console.log(el);
        return (
          <div key={i}>
            {!props.isCard && <TodoTitle data={el} />}
            {el.todoItemList !== undefined && (
              <div className="todo-list">
                <TodoBlock el={el.todoItemList} isCard={props.isCard} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
