import axios from "axios";
import React, { useState } from "react";
import { useFriendListContext } from "../../context/friendListContext";
import { useTodoListContext } from "../../context/todoListContext";
import { useUserContext } from "../../context/userContext/index";
import { useOnlyFiveContext } from "../../context/onlyFiveContext";
import { server_debug } from "../../js/server_url";
import { todoListFormat } from "../../js/todoListFormat";

import "../../styles/Auth.css";
import { useTodayTodoListContext } from "../../context/todayTodoListContext";

function Login(props) {
  const { setUser } = useUserContext();
  const { friendList, setFriendList } = useFriendListContext();
  const { setOnlyFiveList } = useOnlyFiveContext();
  const { setTodayTodoList } = useTodayTodoListContext();
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();

  const { setTodoList } = useTodoListContext();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodoList = async (userId) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentMaxDate = new Date(currentYear, currentMonth, 0).getDate();

    const params = {
      params: {
        userId: userId,
        year: currentYear,
        month: currentMonth,
      },
    };

    await axios
      .get(`${server_debug}/todo/search/todoList`, params)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTodoList(Array.from(todoListFormat(res.data, currentMaxDate)));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchFriendList = async (userId) => {
    const params = {
      params: {
        userId: userId,
      },
    };

    await axios
      .get(`${server_debug}/search/friend`, params)
      .then(async (res) => {
        if (res.status === 200) {
          let friendList = res.data;
          await axios
            .get(`${server_debug}/search/friendRequested`, params)
            .then(async (res) => {
              let friendRequestedList = res.data;

              setFriendList([...friendList, ...friendRequestedList]);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchOnlyFiveList = async (userId) => {
    const params = {
      params: {
        userId: userId,
      },
    };

    await axios
      .get(`${server_debug}/onlyFive`, params)
      .then(async (res) => {
        if (res.status === 200) {
          console.log(res);
          setOnlyFiveList(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      account: account,
      password: password,
    };

    await axios
      .post(`${server_debug}/auth/login`, body)
      .then(async (v) => {
        console.log(v);
        alert("???????????? ?????????????????????.");
        setUser({
          ...v.data,
        });

        try {
          setIsLoading(true);

          const today = new Date();

          await axios
            .get(`${server_debug}/todo/search/todoList`, {
              params: {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
              },
            })
            .then((v) => {
              if (v.status === 200)
                setTodayTodoList(
                  Array.from(
                    todoListFormat(
                      v.data,
                      new Date(
                        today.getFullYear(),
                        today.getMonth() + 1,
                        0
                      ).getDate()
                    )[today.getDate() - 1]
                  )
                );
            });

          await fetchTodoList(v.data.userId).catch(() => setIsLoading(false));
          await fetchFriendList(v.data.userId).catch(() => setIsLoading(false));
          await fetchOnlyFiveList(v.data.userId)
            .then((response) => {
              setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
        props.toggleIsLogined();
        props.setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert("????????? ?????? ??????????????? ??????????????????");
      });
  };

  return (
    <div className="container">
      <form className="container">
        <label>?????????</label>
        <input
          type="name"
          placeholder="?????????"
          className="login-input"
          onChange={(e) => {
            setAccount(e.currentTarget.value);
          }}
        />
        <label>????????????</label>
        <input
          type="password"
          placeholder="????????????"
          className="login-input"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />

        <button onClick={(e) => handleSubmit(e)}>?????????</button>
      </form>
    </div>
  );
}

export default Login;
