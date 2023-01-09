import React, { useEffect, useState } from "react";
import "./Todo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
// import SignOutButton from "./components/SignOut/SignOutButton";
// import SignOutButton from "../SignOut/SignOutButton";
import LoadingSpinnerTwo from "../LoadingSpinner/LoadingSpinnerTwo"

// import uuid from "uuid";
// import { v4 as uuidv4 } from "uuid";

function Todo() {
  // Single Todo
  const [todo, setTodo] = useState("");
  // All Todos
  const [todos, setTodos] = useState([]);
  // Edit Mode
  const [editId, setEditId] = useState(0);
  //loading Buffer
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const apiEndPoint = "https://63ad0ea934c46cd7ae8f6df2.mockapi.io/todo/";
  // https://63ad0ea934c46cd7ae8f6df2.mockapi.io

  const key = window.localStorage.getItem("key");

  useEffect(() => {
    if (!localStorage.getItem("key")) {
      navigate("/");
    }
  });

  // GET with axios
  useEffect(() => {
    // isLoading(true);
    const getTodos = async () => {
      const res = await axios.get(apiEndPoint);
      // setTodos(res.data);
      setTodos(
        res.data.filter((to) => {
          return to.userid === key;
        })
      );
    };
    getTodos();
  }, [key]);

  // DELETE with axios
  const deleteTodo = async (id) => {
    await axios.delete(`${apiEndPoint}${id}`);
    setTodos(
      todos.filter((to) => {
        return to.id !== id;
      })
    );
  };

  // POST with Axios
  const addTodo = async (todo, key) => {
    let res = await axios.post(apiEndPoint, {
      todo: todo,
      userid: key
      // id: id
    });
    setTodos([res.data, ...todos]);
    // setEditId(0);
    setTodo("");
  };

  // PUT with axios
  const editTodoApi = async (editId) => {
    await axios.put(`${apiEndPoint}${editId}`, {
      todo: todo
    });
  };

  //remove All

  const deleteAllTodos = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const rmd = todos.map((t) => t.id);
      for (let i in rmd) {
        await deleteTodo(rmd[i]);
      }
      window.localStorage.removeItem("key");
      navigate("/")
      setIsLoading(false);
    }, 2000);
  };

  // const deleteAllTodos = async () => {
  //   setIsLoading(true);
  //   // Call the delete API for each todo
  //   await Promise.all(
  //     todos.map(async (todo) => {
  //       await axios.delete(`${apiEndPoint}${todo.id}`);
  //     })
  //   );
  //   // Clear the todos state
  //   setTodos([]);
  //   setIsLoading(false);
  // };

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is inside the editId then we need to
    if (editId) {
      setIsLoading(true);
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        // Check it is the todo we are editing
        t.id === editTodo.id
          ? // Then provide same id and todo whatever changes happened
            (t = { id: t.id, todo })
          : // Default value
            { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      // console.log(editTodo.todo);
      editTodoApi(editId);
      // console.log(editId);
      setEditId(0);
      setTodo("");
      setIsLoading(false);
      return;
    }

    if (todo !== "") {
      // setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      addTodo(todo, key);
      setTodo("");
    }
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    // console.log(editTodo.todo);
    setEditId(id);
    // console.log(id);
  };

  // Remove All Todo Api
  /*   const rmvTodo = async (id) => {
    await axios.delete(`${apiEndPoint}${id}`);
  }; */

  // Sign Out

  // function signOut() {
  //   // Delete the user's UUID from local storage
  //   localStorage.removeItem("user_uuid");
  //   // window.localStorage.clear();

  //   // Generate a new, random UUID for the user
  //   const newUUID = uuidv4();
  //   localStorage.setItem("user_uuid", newUUID);
  //   // navigate("/");
  // }

  //============================================================
  //Ravi's Code
  //============================================================

  // const removeUser = async () => {
  //   const rmd = todos.map((td) => td.id);
  //   for (let i in rmd) {
  //     await deleteTodo(rmd[i]);
  //   }
  //   window.localStorage.clear();
  //   navigate("/");
  // };

  //============================================================
  //Ravi's Code
  //============================================================

  //============================================================

  // import uuid from 'uuid';

  // function signOut() {
  //   // Delete the user's UUID from local storage
  //   localStorage.removeItem("user_uuid");

  //   // Generate a new, random UUID for the user
  //   const newUUID = uuid.v4();
  //   localStorage.setItem("user_uuid", newUUID);
  // }

  return (
    <div className="App">
      <header className="">
        {/* Class Container */}
        <div className="container">
          <h1>TODO</h1>
          {/* Class todoForm */}
          <form className="todoForm" onSubmit={handleSubmit}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                pattern=".+"
                required
              />
            )}
            <button variant="text" type="submit" className="btn-submit">
              {editId ? "UPDATE" : "ADD"}
            </button>
          </form>

          {/* Class allTodos List */}
          <ul className="allTodos">
            {/* Class singleTodo */}
            {todos.map((t) => (
              <li className="singleTodo" key={t.id}>
                {/* Class todoText // Inside TodoList */}
                <span className="todoText">{t.todo}</span>
                <button className="btn-action" onClick={() => handleEdit(t.id)}>
                  EDIT
                </button>
                <button
                  className="btn-action"
                  onClick={() => {
                    if (window.confirm("Delete")) {
                      deleteTodo(t.id);
                    }
                  }}
                >
                  DEL
                </button>
              </li>
            ))}
          </ul>
          <button
            className="rmv-all"
            onClick={() => {
              if (isLoading) {
                return <LoadingSpinnerTwo />;
              } else {
                deleteAllTodos();
              }
            }}
          >
            Delete All & Sign Out
          </button>
          {/* <div>
            <button className="sout-btn" type="submit" onClick={signOut()}>
              Sign Out
            </button>
          </div> */}
        </div>
      </header>
    </div>
  );
}

export default Todo;
