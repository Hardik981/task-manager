import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import EdiText from 'react-editext'
import { useSelector, useDispatch } from 'react-redux';
import { addTask, changeTask, deleteTask } from '../redux/dataReducer';
const { v4: uuidv4 } = require('uuid');
function CheckTaskUrl() {
    const location = useLocation();
    let navigate = useNavigate();
    const [run, setRun] = useState(false);
    useEffect(() => {
        if (location?.pathname.slice(1) === location?.state?.name) {
            setRun(true);
        }
        else {
            setRun(false);
            navigate("*");
        }
    }, []);
    return (
        run &&
        <Tasks />
    )
}
function Tasks() {
    const location = useLocation();
    const [state, setState] = useState(true);
    const inputFilter = useRef({});
    const [showData, setShowData] = useState([]);
    const [filterState, setFilterState] = useState(false);
    const [updateData, setUpdateData] = useState(0);
    const data = useSelector((state) => state.getData.data);
    const dispatch = useDispatch();
    useEffect(() => {
        displayData();
    }, [updateData]);
    function changeDataOnSave(value, index) {
        dispatch(changeTask({ userIndex: location.state.index, index: index, value: value }));
    }
    function resultJSX(data, index, id) {
        return (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <EdiText type='text' value={data.taskName} onSave={v => changeDataOnSave(v, index)} />
                <div>{data.status}</div>
                <div>{data.dueDate}</div><button onClick={() => removeItem(index)}>Remove</button>
            </div>
        )
    }
    function displayData() {
        let temp = [];
        data[location.state.index].tasks.map(function (data, index) {
            if (filterState) {
                if ((data.taskName.toLowerCase().startsWith(inputFilter.current.input.value.toLowerCase()) || data.dueDate === inputFilter.current.date.value) && data.status === inputFilter.current.status.value) {
                    temp.push(resultJSX(data, index, data.id));
                }
            }
            else {
                temp.push(resultJSX(data, index, data.id));
            }
        })
        setShowData(temp);
    }
    function removeItem(index) {
        dispatch(deleteTask({ userIndex: location.state.index, index: index }));
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
            <h3>{location?.state?.name} Task</h3>
            <h3>Filters</h3>
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
            {state ? <Btn send={setState} /> : <AddTask send={{ setState, setUpdateData, updateData, setFilterState }} />}
            <h3>Results</h3><div>{showData}</div>
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
    const getInputData = useRef({});
    const dispatch = useDispatch();
    useEffect(() => {
        getInputData.current.taskName.focus();
    }, []);
    function setInputData(e) {
        e.preventDefault();
        dispatch(addTask({ id: uuidv4(), userIndex: [location.state.index], taskName: getInputData.current.taskName.value, status: getInputData.current.status.value, dueDate: getInputData.current.date.value }));
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

export default CheckTaskUrl;