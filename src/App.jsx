import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/About'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom';

function App() {
  let initTodo
  if(localStorage.getItem("todos") === null){
    initTodo = []
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"))
  }
  const onDelete = (todo) => {
    setTodos(todos.filter((e)=> {
      return e!==todo
    }))
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const addTodo = (title, desc) => {
    let sno
    if(todos.length == 0){
      sno = 1
    }
    else{
      sno = todos[todos.length-1].sno + 1
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo)
    alert("The todo has been added") 
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>  
      <Router>
        <Header title="Todo App"/>
        <Routes>
          <Route exact path="/" element={
            <>
              <AddTodo addTodo={addTodo}/>
              <Todos todos={todos} onDelete={onDelete}/>
            </>            
          }/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App
