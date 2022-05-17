import { useLocation } from 'react-router-dom'
import { useState, useContext, useRef,useEffect } from 'react';
import { DataContext } from '../App';
export function Tasks() {
    const location = useLocation();
    const setData = useContext(DataContext);
    const [state, setState] = useState(true);
    const [showFilters, setShowFilter] = useState(false);
    const inputFilter = useRef({});
    const [onFilters, changeOnFilters] = useState(false);
    const [showData, setShowData] = useState([]);
    const listNames = setData.data[location.state.index].tasks.map((data) =>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}><div>{data.taskName}</div><div>{data.status}</div><div>{data.dueDate}</div></div>
    )
    function filterData(e) {
        e.preventDefault();
        setShowData();
        changeOnFilters(true);
        setData.data[location.state.index].tasks.map(function (data) {
            data.taskName === inputFilter.current.input.value && data.status === inputFilter.current.status.value ? console.log("Same") : console.log("Not Same");
            if (data.taskName.slice(0, inputFilter.current.input.value.length) === inputFilter.current.input.value && data.status === inputFilter.current.status.value && data.dueDate === inputFilter.current.date.value) {
                setShowData([...showData, <div style={{ display: 'flex', justifyContent: 'space-evenly' }}><div>{data.taskName}</div><div>{data.status}</div><div>{data.dueDate}</div></div>,])
            }
        })
    }
    return (
        <>
            <h3>{location.state?.name} Task</h3>
            {state ? <Btn send={setState} /> : <AddTask send={{ setState, changeOnFilters}} />}
            <h3 onClick={() => setShowFilter(true)}>Filters</h3>
            {showFilters &&
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
            }
            {onFilters ? <div>{showData}</div> : <div>{ listNames }</div>}
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
    function setInputData(e) {
        /* let getName = setData.data[location.state.index].name; */
        e.preventDefault();
        let temp = [...setData.data];
        temp[location.state.index].tasks.push({ taskName: getInputData.current.taskName.value, status: getInputData.current.status.value, dueDate: getInputData.current.date.value })
        /* temp[location.state.index] = { name: getName, tasks: [ ...setData?.data[location.state.index]?.tasks, { taskName: getInputData.current.taskName.value, status: getInputData.current.status.value, dueDate: getInputData.current.date.value },] };  */// FIXME Task Data Not Added
        setData.changeData(temp);
        console.log("🚀 ~ file: Tasks.js ~ line 33 ~ se tInputData ~ setData", setData?.data)
        props.send.setState(true);
        props.send.changeOnFilters(false);
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
