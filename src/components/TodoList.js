import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import "../App.css"


export default function FormPage() {

    const [task, settask] = useState("");
    let [fetchedData, setFetchedData] = useState([])
    const [showTable, setShowTable] = useState(false);
    let [completedtask, setCompletedtask] = useState([])
 

    const handleChange = (event) => {
        const value = event.target.value;
        settask(value)
    }
    //get data
    const getData = () => {
        axios.get(`https://prt-fullstack-backend.onrender.com/task`).
            then((data) => {
                console.log(data.data.data)
                setFetchedData(data.data.data)
            })
    };
    useEffect(() => {
        getData()
    }, []);
    //post data
    const submitForm = (e) => {
        e.preventDefault()
        if (task) {
            axios.post('https://prt-fullstack-backend.onrender.com/task', {
                task: task,
                status: "Pending",
                time:""
            })
                .then(function (response) {
                    getData()
                    settask("")

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Field must not be empty")
        }
    }


    let handleEdit = (_id,task, time) => {
        axios.put(`https://prt-fullstack-backend.onrender.com/task/${_id}`)
            .then((res) => {
                getData();
            }).then(()=>{
                setShowTable(true)
                setCompletedtask((data)=>{
                    console.log(data);
                    return [...data,task]
                })
            })
            .catch((err) => console.log(err));
    }

    //delete Data
    function handleDelete(_id) {
        axios
            .delete(`https://prt-fullstack-backend.onrender.com/task/${_id}`)
            .then(() => {
                getData()
            });
    }
    return (
        <div id='parent-container'>
            <div className='sidebar'>
                <div>
                    <h2>To Do List</h2>
                    <h3>History</h3>
                    {showTable && <table id='completed-task-table'>
                        {completedtask.map((data, index)=>{
                            return <tr>
                                <td>{data}</td>
                            </tr>
                        })}
                    </table>}
                </div>
                <h3><Link to="/">Logout</Link></h3>

            </div>
            <div id='main-container'>
                <div>
                    <form className="create-container" onSubmit={submitForm}>
                        <input placeholder="Add new activity"
                            className="input-boxing"
                            type="task"
                            name="task"
                            value={task}
                            onChange={handleChange}
                        />
                        <button type="submit" className="add-btn " > Add</button>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Status</th>
                            <th>Time Taken (Hr:Min:Sec)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedData.map((data) => {
                            return <tr>
                                <td>{data.task}</td>
                                <td>{data.status}</td>
                                <td>{data.time}</td>
                            <td><button onClick={()=>{handleEdit(data._id, data.task, data.time)}} className='action-btn end'>End</button>
                            <button className='action-btn pause'>Pause</button>
                            <button onClick={()=>{handleDelete(data._id)}} className='action-btn delete'>Delete</button>
                             </td>
                            </tr>
                        })}
                    </tbody>
                </table>

            </div>

        </div>

    )
}