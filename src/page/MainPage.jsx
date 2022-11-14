import React, { useState } from "react";

import Toolbar from "../components/Sidebar/Toolbar";
import MyModal from "../components/Modal/MyModal";
import Login from "../components/Login/Login";

import "../styles/MainPage.css";

import MyChart from "../components/Chart/MyChart";
import Quotes from "../components/Quotes/Quotes.jsx";
import TodayTodoList from "../components/Todo/TodayTodoList";
import CalendarNav from "../components/CalendarNavigator/CalendarNav";
import TodoList from "../components/Todo/TodoList.jsx";

function Mainpage() {
  const [isLogined, setIsLogined] = useState(true);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  const [todoModalIsOpen, setTodoModalIsOpen] = useState(false);
  const [todoData, setTodoData] = useState([]);

  const toggleIsLogined = () => {
    setIsLogined(!isLogined);
  };

  const showLoginModal = () => {
    setLoginIsOpen(true);
  };

  return (
    <div>
      {/* chart TopCenter */}
      <MyChart />

      {/* quotes LeftCenter */}
      <Quotes />

      {/* TodatTodoList RightCenter */}
      <TodayTodoList />

      {/* CalendarNav TopCenter */}
      <CalendarNav
        setTodoModalIsOpen={setTodoModalIsOpen}
        setTodoData={setTodoData}
      />
      {todoModalIsOpen && (
        <MyModal
          isAnimation={true}
          setIsOpen={setTodoModalIsOpen}
          el={<TodoList data={todoData} />}
        />
      )}

      {/* sidemenu */}
      <Toolbar
        isLogined={isLogined}
        toggleIsLogined={toggleIsLogined}
        showLoginModal={showLoginModal}
      />
      {loginIsOpen && (
        <MyModal
          setIsOpen={setLoginIsOpen}
          el={
            <Login
              toggleIsLogined={toggleIsLogined}
              setIsOpen={setLoginIsOpen}
            />
          }
        />
      )}
    </div>
  );
}

export default Mainpage;
