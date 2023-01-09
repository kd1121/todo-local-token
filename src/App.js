import React from "react";
import Todo from "./components/Todo/Todo";
import SignInButton from "./components/SignIn/SignInButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInButton />} />
          <Route path="/home" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
