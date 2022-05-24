import { useLocation } from 'react-router-dom'
import { useState, useContext, useRef, useEffect } from 'react';
import { DataContext } from '../App';
export function Tasks() {
    const location = useLocation();
    const setData = useContext(DataContext);
    const [state, setState] = useState(true);
    const [showFilters, setShowFilter] = useState(false);
    const inputFilter = useRef({});
    const [showData, setShowData] = useState([]);
    const nameRefs = useRef([]);
    const [filterState, setFilterState] = useState(false);
    const [updateData, setUpdateData] = useState(0);
    useEffect(() => {
        displayData();
    },[updateData]);
    function displayData() {
        let temp = [];
        setData.data[location.state.index].tasks.map(function (data, index) {
            if (filterState) {
                if ((data.taskName.toLowerCase().startsWith(inputFilter.current.input.value.toLowerCase()) || data.dueDate === inputFilter.current.date.value) && data.status === inputFilter.current.status.value) {
                    temp.push(<div style={{ display: 'flex', justifyContent: 'space-evenly' }}><div contentEditable="false" ref={(element) => { nameRefs.current[index] = element }}>{data.taskName}</div><div>{data.status}</div><div>{data.dueDate}</div><button onClick={() => editName(index)}>Edit</button><button onClick={() => removeItem(index)}>Remove</button></div>);
                }
            }
            else {
                temp.push(<div style={{ display: 'flex', justifyContent: 'space-evenly' }}><div contentEditable="false" ref={(element) => { nameRefs.current[index] = element }}>{data.taskName}</div><div>{data.status}</div><div>{data.dueDate}</div><button onClick={() => editName(index)}>Edit</button><button onClick={() => removeItem(index)}>Remove</button></div>)
            }
        })
        setShowData(temp);
    }
    function editName(index) {
        nameRefs.current[index].contentEditable = "true";
        nameRefs.current[index].focus();
    }
    function removeItem(index) {
        let temp = [...setData.data];
        temp[location.state.index].tasks.splice(index, 1);
        setData.changeData(temp);
        setUpdateData(updateData + 1);
    }
    function filterData(e) {
        e.preventDefault();
        setUpdateData(updateData + 1);
        setFilterState(true);
    }
    function displayAll() {
        setUpdateData(updateData + 1);
        setFilterState(false)
    }
    return (
        <>
            <h3>{location.state?.name} Task</h3>
            {state ? <Btn send={setState} /> : <AddTask send={{ setState, setUpdateData, updateData, setFilterState }} />}
            <h3 onClick={() => setShowFilter(true)}>Filters</h3>
            {showFilters &&
                <>
                    <form onSubmit={filterData}>
                        <label>Search </label>
                        <input type="text" ref={(element) => inputFilter.current.input = element} />
                        <select name='status' ref={(element) => { inputFilter.current.status = element }}>
                            <option name='pending'>pending</option>
                            <option name='completed'>Completed</option>
                        </select>
                        <input type="date" ref={(element) => inputFilter.current.date = element} />
                        <input type="submit" />
                    </form>
                <br /><button onClick={displayAll}>Display All</button>
                </>
            }
            <><h3>Results</h3><div>{showData}</div></>
        </>
    )
}
function Btn(props) {
    function changeState() {
        props.send(false);
    }
    return <button onClick={changeState}>Add Task</button>;
}
function AddTask(props) {
    const location = useLocation();
    const setData = useContext(DataContext);
    const getInputData = useRef({});
    useEffect(() => {
        getInputData.current.taskName.focus();
    }, []);
    function setInputData(e) {
        e.preventDefault();
        let temp = [...setData.data];
        const dateValue = getInputData.current.date.value === '' ? "Not Set" : getInputData.current.date.value;
        temp[location.state.index].tasks.push({ taskName: getInputData.current.taskName.value, status: getInputData.current.status.value, dueDate: dateValue })
        setData.changeData(temp);
        console.log("🚀 ~ file: Tasks.js ~ line 33 ~ se tInputData ~ setData", setData?.data)
        props.send.setState(true);
        props.send.setUpdateData(props.send.updateData + 1);
        props.send.setFilterState(false);
    }
    return (
        <form onSubmit={setInputData}>
            <label>Task Name </label>
            <input type='text' ref={(element) => { getInputData.current.taskName = element }} />
            <label>Status </label>
            <select name='status' ref={(element) => { getInputData.current.status = element }}>
                <option name='pending'>pending</option>
                <option name='completed'>Completed</option>
            </select>
            <label>Due Date </label>
            <input type="date" name='due-date' ref={(element) => { getInputData.current.date = element }} />
            <input type="submit" />
        </form>
    );
}