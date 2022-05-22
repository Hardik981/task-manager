import { useLocation } from 'react-router-dom'
import { useState, useContext, useRef, useEffect } from 'react';
import { DataContext } from '../App';
export function Tasks() {
    const location = useLocation();
    const setData = useContext(DataContext);
    const [state, setState] = useState(true);
    const [showFilters, setShowFilter] = useState(false);
    const inputFilter = useRef({});
    const [onFilters, changeOnFilters] = useState(false);
    const [showData, setShowData] = useState([]);
    const nameRefs = useRef([]);
    const tempArray = useRef();
    const [putArray, setPutArray] = useState(false);
    const [getCount, setGetCount] = useState();
    const listData = setData.data[location.state.index].tasks.map((data, index) =>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}><div contentEditable="false" ref={(element) => { nameRefs.current[index] = element }}>{data.taskName}</div><div>{data.status}</div><div>{data.dueDate}</div><button onClick={() => editName(index)}>Edit</button>
            <button onClick={() => removeItem(index)}>Remove</button></div>
    )
    function editName(index) {
        nameRefs.current[index].contentEditable = "true";
        nameRefs.current[index].focus();
    }
    function removeItem(index) {
        let temp = [...setData.data];
        temp[location.state.index].tasks.splice(index, 1);
        setData.changeData(temp);
    }
    function removeFilterItem(index) {
        setPutArray(true);
        setGetCount(index);
        console.log("🚀 ~ file: Tasks.js ~ line 32 ~ removeFilterItem ~ index", index)
    }
    function setTempArray() {
        setShowData(tempArray.current);
    }
    useEffect(() => {
        if (putArray) {
            tempArray.current = [...showData];
            tempArray.current.splice(getCount, 1);
            console.log("🚀 ~ file: Tasks.js ~ line 40 ~ useEffect ~ getCount", getCount)
            setTempArray();
            setPutArray(false);
        }
    }, [showData,putArray,getCount]);
    function filterData(e) {
        e.preventDefault();
        let temp = [];
        setData.data[location.state.index].tasks.map(function (data,index) {
            if (data.taskName.startsWith(inputFilter.current.input.value) && data.dueDate === inputFilter.current.date.value && data.status === inputFilter.current.status.value) {
                temp.push(<div style={{ display: 'flex', justifyContent: 'space-evenly' }}><div contentEditable="false" ref={(element) => { nameRefs.current[index] = element }}>{data.taskName}</div><div>{data.status}</div><div>{data.dueDate}</div><button onClick={() => editName(index)}>Edit</button><button onClick={() => removeFilterItem(index)}>Remove</button></div>);
            }
        })
        setShowData(temp);
        changeOnFilters(true);
    }
    return (
        <>
            <h3>{location.state?.name} Task</h3>
            {state ? <Btn send={setState} /> : <AddTask send={{ setState, changeOnFilters }} />}
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
                    <br /><button onClick={() => changeOnFilters(false)}>Display All</button>
                </>
            }
            {onFilters ? <><h3>Filtered Tasks</h3><div>{showData}</div></> : <><h3>All Tasks</h3><div>{listData}</div></>}
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
        temp[location.state.index].tasks.push({ taskName: getInputData.current.taskName.value, status: getInputData.current.status.value, dueDate: getInputData.current.date.value })
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
