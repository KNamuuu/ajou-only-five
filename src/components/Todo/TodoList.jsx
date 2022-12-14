import React, { useState } from "react";
import TodoBlock from "./TodoBlock";
import TodoTitle from "./TodoTitle";

function TodoList(props) {
  return (
    <div className="todo-title-list">
      {props.data.map((el, i) => {
        // console.log(el);
        return (
          <div key={i}>
            {!props.isCard && (
              <TodoTitle data={el} day={props.day} isToday={props.isToday} />
            )}
            {el.todoItemList !== undefined && (
              <div className="todo-list">
                <TodoBlock
                  el={el.todoItemList}
                  isCard={props.isCard}
                  isToday={props.isToday}
                  idx={i}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
