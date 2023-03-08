import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Todos from "./components/TodoList";

function App() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/todos')
            .then(res => res.json())
            .then(data => {
                const result = Object.keys(data).map(id => ({ id, ...data[id] }))
                console.log(data);
                setTodos(result);
                setIsLoading(false)
            })
    }, []);

    function onTodoAdd() {
        const lastId = todos[todos.length - 1].id;
        const text = prompt('Task name: ');
        const newTask = { id: lastId + 1, text, isCompleted: false }
        setTodos(state => [newTask, ...state]);
    }

    function deleteTodo(id){
        setTodos(state => state.filter(task => task.id !== id))
    }
    const toggleTodostatus = (id) => {
        setTodos(state => state.map(t => t.id === id ? ({ ...t, isCompleted: !t.isCompleted }) : t))
    }
    return (
        <div className="App">
            <Header />
            <main className="main">

                <section className="todo-list-container">
                    <h1>Todo List</h1>

                    <div className="add-btn-container">
                        <button className="btn" onClick={onTodoAdd}>+ Add new Todo</button>
                    </div>

                    <div className="table-wrapper">

                        {isLoading ?
                            <Loading /> :
                            <Todos todos={todos} toggleTodostatus={toggleTodostatus} deleteTodo={deleteTodo}/>
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </div >
    );
}

export default App;
