import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [editStatus, setEditStatus] = useState(false);
  const [allTodoData, setAllTodoData] = useState("");
  const [addTodoData, setAddTodoData] = useState("");
  const [addPriorityData, setAddPriorityData] = useState("");
  const [updateData, setUpdateData] = useState('')

  const apiUrl = "http://localhost:4000"

const allData = ()=>{
  axios.get(`${apiUrl}/all`).then((response) => {
      console.log("all data", response.data);
      setAllTodoData(response.data);
    });
}

  // Add Todo
  const addTodoHandler = (e) => {
    e.preventDefault();
    console.log('Add Data Input', addTodoData, addPriorityData)
    axios.post(`${apiUrl}/create`, {todo:addTodoData, priority:addPriorityData}).then((response) => {
      // console.log("all data", response.data);
       allData();
       setAddTodoData('');
       setAddPriorityData('')
    });
  };

  // Delete Todo 
  const deleteHandler=(e, data)=>{
  e.preventDefault()
  console.log('delte Data info', data )
  axios.delete(`${apiUrl}/delete/${data.id}`).then((response)=>{
    console.log("Delete data", response);
    allData()
  })
  }

  // Update data
  const updateHandler =(e, data)=>{
    e.preventDefault()
    console.log("update data info", data);
    axios.put(`${apiUrl}/update`, {priority:updateData, id:data.id}).then((response)=>{
      allData();
      setUpdateData("")
      setEditStatus(false);
    })
  }


  useEffect(() => {
    axios.get(`${apiUrl}/all`).then((response) => {
      console.log("all data", response.data);
      setAllTodoData(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className=" flex px-5 mt-10">
        <div className="w-1/3  border-2 bottom-2 mr-2 px-5">
          <h1 className="font-bold text-3xl mb-5 mt-5"> Todo List </h1>
          <label className="block text-left text-lg font-semibold">
            Todo
          </label>
          <input
            type="text"
            placeholder="Type your todo"
            className="w-full border-2 mb-5"
            onChange={(e)=>setAddTodoData(e.target.value)}
          />
          <label className="block text-left text-lg font-semibold">
           
            Priority
          </label>
          <input
            type="text"
            placeholder="Prioity"
            className="w-full border-2 mb-5"
            onChange={(e)=>setAddPriorityData(e.target.value)}
          />
          <button
            className="bg-green-600 block text-center w-full mb-10 text-white font-semibold py-2"
            onClick={(e) => addTodoHandler(e)}
          >
            Add Todo
          </button>
        </div>
        <div className="border-2 w-full pl-5">
          <h1 className="font-bold text-3xl mb-5 mt-5"> This is Todo List</h1>
          <ul>
            {allTodoData.length > 0 &&
              allTodoData.map((data, index) => (
                <li
                  className="text-left text-lg border-2 border-black p-2 mr-5 mb-2"
                  key={index}
                >
                  <div className="flex">
                    <div>
                      {" "}
                      {data.todo}
                      <span
                        className={`text-pink-700 font-bold ${
                          !editStatus ? "block" : "hidden"
                        }`}
                      >
                        {data.priority}
                      </span>
                    </div>
                    <div
                      className={`${editStatus ? "block" : "hidden"} border`}
                    >
                      <input type="text" className="border" onChange={(e)=>setUpdateData(e.target.value)} />
                      <button className="p-1 text-white mx-2 bg-green-700" onClick={(e)=> updateHandler(e, data) }>
                        Update
                      </button>
                      <button
                        className="bg-red-600 p-1 mr-2 text-white mx-2"
                        onClick={() => setEditStatus(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div className="space-x-10 border-t-4 border-yellow-500">
                    <button onClick = {(e)=>deleteHandler(e, data)}>Delete</button>
                    <button onClick={() => setEditStatus(true)}>Edit</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
