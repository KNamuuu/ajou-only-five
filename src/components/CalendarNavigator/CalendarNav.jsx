import React, { useEffect, useRef } from "react";

import TodoList from "../Todo/TodoList.jsx";
import { target } from "./transform";

import todoList from "./todoList.json";
import "../../styles/CalendarNav.css";

function CalendarNav() {
  const coverRef = useRef();

  useEffect(() => {
    const items = coverRef.current.children;
    const today = new Date();
    const todayDate = today.getDate();

    // target(items, Math.floor(todoList.length / 2));
    target(items, todayDate);
  }, []);

  return (
    <div className="coverflow" ref={coverRef}>
      {todoList.map((el, i) => {
        console.log(el);
        return (
          <div
            key={el.day}
            className="card coverflow-item"
            onClick={() => {
              const items = coverRef.current.children;
              target(items, i);
            }}
          >
            <div>{el.day}일</div>
            <TodoList data={el.todoData} isCard={true} />
          </div>
        );
      })}
    </div>
  );
}

export default CalendarNav;
