import { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/Loader';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import AuthUser from './components/AuthUser';
import Login from './components/Login';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  interface Todo {
    title: string;
    id: number;
    completed: boolean;
  }

  const handleCompleted = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleOnSubmit = (value: string) => {
    setTodos([...todos, { title: value, id: todos.length + 1, completed: false }]);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(res => setTodos(res.slice(0, 10)))
      .catch(error => console.error(error)); // Handle the error using console.error or other means
  }, []);

  return (
    <div className="App">
      {todos.length > 0 ? (
        todos.map((todo: Todo, index: number) => (
          <Todo
            key={todo.id} // Add a unique key for each Todo component
            todo={todo}
            index={index}
            handleCompleted={handleCompleted}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <Loader />
      )}
      <TodoForm handleOnSubmit={handleOnSubmit} />
      <Login />
      <AuthUser />
    </div>
  );
}

export default App;
