import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import EdiText from 'react-editext'
import { useSelector, useDispatch } from 'react-redux';
import { addTask, changeTask, deleteTask } from '../redux/dataReducer';
import styles from '../css/users.module.css';
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
    const [btnState, setBtnState] = useState(true);
    const [filterBtnState, setFilterBtnState] = useState(true);
    const [inputFilter, setInputFilter] = useState({ taskName: null, dueDate: null, status: 'pending' });
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
            <div key={id} className={styles.displayData}>
                <EdiText type='text' value={data.taskName} onSave={v => changeDataOnSave(v, index)} />
                <div>{data.status}</div>
                <div>{data.dueDate}</div><button onClick={() => removeItem(id)}>Remove</button>
            </div>
        )
    }
    function displayData() {
        let temp = [];
        data[location.state.index].tasks.map(function (data, index) {
            if (filterState) {
                if ((data.taskName.toLowerCase().startsWith(inputFilter.taskName?.toLowerCase()) || inputFilter.taskName === null) && (data.dueDate === inputFilter.dueDate || inputFilter.dueDate === null) && data.status === inputFilter.status) {
                    temp.push(resultJSX(data, index, data.id));
                }
            }
            else {
                temp.push(resultJSX(data, index, data.id));
            }
        })
        setShowData(temp);
    }
    function removeItem(id) {
        dispatch(deleteTask({ userIndex: location.state.index, id: id }));
        setUpdateData(updateData + 1);
    }
    function displayAll() {
        setUpdateData(updateData + 1);
        setFilterState(false)
    }
    return (
        <>
            <h2 className={styles.heading}>{location?.state?.name} Task</h2>
            <div className={styles.bodySpace}>
                {btnState ? <TaskBtn send={setBtnState} /> : <AddTask send={{ setBtnState, setUpdateData, updateData, setFilterState }} />}
                {filterBtnState ? <FilterTaskBtn send={setFilterBtnState} /> : <SearchFilters send={{ setFilterBtnState, setFilterState, setUpdateData, updateData, inputFilter, setInputFilter }} />}
                <button className={styles.button} onClick={displayAll}>Display All</button>
                <h3>Results</h3><div>{showData}</div>
            </div>
        </>
    )
}
function TaskBtn(props) {
    function changeState() {
        props.send(false);
    }
    return <button className={styles.button} onClick={changeState}>Add Task</button>;
}
function FilterTaskBtn(props) {
    function changeState() {
        props.send(false);
    }
    return <button className={styles.button} onClick={changeState}>Filters</button>;
}
function AddTask(props) {
    const location = useLocation();
    const [getInputData, setGetInputData] = useState({ taskName: null, status: 'pending', dueDate: null });
    const dispatch = useDispatch();
    function setInputData(e) {
        e.preventDefault();
        dispatch(addTask({ id: Date.now(), userIndex: [location.state.index], taskName: getInputData.taskName, status: getInputData.status, dueDate: getInputData.dueDate }));
        props.send.setBtnState(true);
        props.send.setUpdateData(props.send.updateData + 1);
        props.send.setFilterState(false);
    }
    function close() {
        props.send.setBtnState(true);
    }
    return (
        <form className={styles.form} onSubmit={setInputData}>
            <input className={styles.input} type='text' autoFocus onChange={(e) => { setGetInputData({ taskName: e.target.value, status: getInputData.status, dueDate: getInputData.dueDate }) }} placeholder="Enter the Task" />
            <label className={styles.label}>Status </label>
            <select className={styles.select} onChange={(e) => { setGetInputData({ taskName: getInputData.taskName, status: e.target.value, dueDate: getInputData.dueDate }) }}>
                <option value='pending'>pending</option>
                <option value='completed'>Completed</option>
            </select>
            <label className={styles.label}>Due Date </label>
            <input className={styles.input} type="date" onChange={(e) => { setGetInputData({ taskName: getInputData.taskName, status: getInputData.status, dueDate: e.target.value }) }} />
            <input className={styles.button} type="submit" />
            <button className={styles.button} onClick={close}>Close</button>
        </form>
    );
}

function SearchFilters(props) {
    function filterData(e) {
        e.preventDefault();
        props.send.setUpdateData(props.send.updateData + 1);
        props.send.setFilterState(true);
        props.send.setFilterBtnState(true);
    }
    function close() {
        props.send.setFilterBtnState(true);
    }
    return (
        <form onSubmit={filterData}>
            <input type="text" onChange={(e) => props.send.setInputFilter({ taskName: e.target.value, dueDate: props.send.inputFilter.dueDate, status: props.send.inputFilter.status })} placeholder="Search Text" />
            <select onChange={(e) => props.send.setInputFilter({ taskName: props.send.inputFilter.taskName, dueDate: props.send.inputFilter.dueDate, status: e.target.value })}>
                <option value='pending'>pending</option>
                <option value='completed'>Completed</option>
            </select>
            <input type="date" onChange={(e) => props.send.setInputFilter({ taskName: props.send.inputFilter.taskName, dueDate: e.target.value, status: props.send.inputFilter.status })} />
            <input type="submit" />
            <button onClick={close}>Close</button>
        </form>
    )
}

export default CheckTaskUrl;