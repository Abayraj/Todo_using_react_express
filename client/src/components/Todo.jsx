import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const Todo = () => {
    const [TodoItems, setTodoList] = useState([]);
    const [searchTodo, setSerchTodo] = useState("");
    const [editTodo, setEditTodoId] = useState(null);




    const API_URL = "http://localhost:4005/api/todo";
    const fetchTodo = async () => {
        try {
            const response = await axios.get(API_URL);
            setTodoList(response.data);
        }
        catch (error) {
            //the error we set in backend will get here
            console.log(error.response.data.message)
        }

    };
    const handleInputChange = (event) => {
        const { value, key } = event.target;
        if (key === 'Enter') {
            event.preventDefault();
            setSerchTodo("");
        }
        setSerchTodo(value);
    }
    const handleAddTodo = async (event) => {
        event.preventDefault();
        if (searchTodo) {
            try {
                const response = await axios(API_URL, {
                    method: "POST",
                    data: {
                        todo: searchTodo,
                    }
                });
                setTodoList(response.data);
                setSerchTodo("");
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    const updateTodo = async (id, todo, isCompleted) => {
        if (editTodo) {
            try {
                const response = await axios(API_URL, {
                    method: "PUT",
                    data: {
                        id: id,
                        todo: todo,
                        isCompleted: isCompleted

                    }
                });

                setTodoList(response.data);
                setSerchTodo("");

            }
            catch (error) {
                console.log(error);
            }

        }
    };
    const handleEdit = (id) => {
        setEditTodoId(id);
    };


    useEffect(() => {
        fetchTodo();
    }, [searchTodo])

    console.log(TodoItems, "todo item")

    return (
        <div>
            <form method="post" onSubmit={handleAddTodo}>
                <label htmlFor="">enter todo items</label>
                <input type="text" placeholder='enter todo' onChange={handleInputChange} value={searchTodo} />
                <button type='submit'>add todo</button>
            </form>
            <ul>
                {TodoItems.map((data) => (
                    <div key={data.id}>
                        <li>{data.todo}</li>
                        <button onClick={() => handleEdit(data.id)}>edit</button>
                        {editTodo === data.id &&
                            <>
                                <input type='text' key={`${data.id}-input`} />
                                <button onClick={updateTodo}>save</button>
                            </>

                        }
                    </div>
                ))}
            </ul>
        </div>
    )
}
