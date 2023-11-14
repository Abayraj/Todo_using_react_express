import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const Todo = () => {
    const [TodoItems, setTodoList] = useState([]);
    const [searchTodo, setSerchTodo] = useState("");
    const [editTodo, setEditTodoId] = useState(null);
    const [editData, setEditData] = useState("");


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
    const updateTodo = async () => {
        if (editTodo !== null && editData !== '') {
            const data = {
                id: editTodo,
                todo: editData,
                isCompleted: true
            }
            try {
                const response = await axios.put(API_URL, data)
                // method: "PUT",
                setTodoList(response.data);
                setEditTodoId(null);
                setSerchTodo("");
            }
            catch (error) {
                console.log(error);
            }

        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(API_URL, { data: { id } })
            setTodoList(response.data);
            setEditTodoId(null);
        }
        catch (error) {
            console.log(error);
        }

    }
    const cancelUpdate = () => {
        setEditTodoId(null);
    }

    const handleEdit = (id, todo) => {
        setEditData(todo);
        setEditTodoId(id);
    };


    useEffect(() => {
        fetchTodo();
    }, [searchTodo])

    console.log(TodoItems, "todo item")

    return (
        <div className='flex justify-center items-center bg-slate-500 h-screen w-full' >
            <div>
                <form method="post" onSubmit={handleAddTodo}>
                    <input className='border pl-4' type="text" placeholder='enter todo' onChange={handleInputChange} value={searchTodo} />
                    <button className='bg-gray-900 rounded text-white text-sm p-1 ml-2' type='submit'>add todo</button>
                </form>
                <ul>
                    {TodoItems.map((data) => (
                        <div key={data.id}>
                            <li className='text-2xlfont m-4 text-2xl font-mono '>{data.todo}</li>
                            <button className='bg-gray-900 rounded text-white text-sm p-1 ml-2' onClick={() => handleEdit(data.id, data.todo)}>edit</button>
                            <button className='bg-gray-900 rounded text-white text-sm p-1 ml-2' onClick={() => handleDelete(data.id)}>delete</button>
                            {editTodo === data.id &&
                                <>
                                    <input className='border pl-4'   type='text' key={data.id} value={editData} onChange={(event) => setEditData(event.target.value)} />
                                    <button className='bg-gray-900 rounded text-white text-sm p-1 ml-2' onClick={updateTodo}>save</button>
                                    <button  className='bg-gray-900 rounded text-white text-sm p-1 ml-2'onClick={cancelUpdate}>cancel</button>
                                </>

                            }
                        </div>
                    ))}
                </ul>
            </div>

        </div>

    )
}
