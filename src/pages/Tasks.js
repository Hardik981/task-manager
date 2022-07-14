import { useLocation, useNavigate }        from 'react-router-dom'
import { useState, useEffect}              from 'react';
import EdiText                             from 'react-editext'
import { useSelector, useDispatch }        from 'react-redux';
import { addTask, changeTask, deleteTask } from '../redux/dataReducer';
import styles                              from '../css/tasks.module.css';

function CheckTaskUrl() {

    const location      = useLocation();
    let navigate        = useNavigate();
    const [run, setRun] = useState(false);

    useEffect(() => {

        if (location?.pathname.slice(1) === location?.state?.name) setRun(true);

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

    const location                            = useLocation();
    const [btnState, setBtnState]             = useState(true);
    const [filterBtnState, setFilterBtnState] = useState(true);
    const [inputFilter, setInputFilter]       = useState({ taskName: null, dueDate: null, status: 'pending' });
    const [showData, setShowData]             = useState([]);
    const [filterState, setFilterState]       = useState(false);
    const [updateData, setUpdateData]         = useState(0);
    const [showDataBox,changeShowDataBox]     = useState(false);
    const [showNull,changeShowNull]           = useState("");
    const data                                = useSelector((store)=> store.getData.data);
    const dispatch                            = useDispatch();
    
    useEffect(() => {

        displayData();

    }, [updateData]);
    
    useEffect(() => {
        
        changeDisplay();
    
    }, []);
    
    useEffect(() => {
        
        changeDisplay();

    }, [showData]);

    function changeDisplay(){
        
        data[location.state.index].tasks?.length === 0 ? changeShowNull("No Task") : changeShowNull("No Result");
        showData.length > 0 ? changeShowDataBox(true)                              : changeShowDataBox(false);
    
    }

    function changeDataOnSave(value, index) {

        dispatch(changeTask({ userIndex: location.state.index, index: index, value: value }));
    
    }

    function resultJSX(arrData, index, id) {

        return (

            <div key={id} className={styles.displayData}>

                <EdiText type='text' value={arrData.taskName} onSave={v => changeDataOnSave(v, index)} />
                <div>{arrData.status} </div>
                <div>{arrData.dueDate}</div> <button onClick={() => removeItem(id)}>Remove</button>
            
            </div>

        )

    }

    function displayData() {

        let temp = [];

        data[location.state.index].tasks.map(function (arrData, index) {

            if (filterState) {
                
                if ((arrData.taskName.toLowerCase().startsWith(inputFilter.taskName?.toLowerCase()) || inputFilter.taskName === null) && (arrData.dueDate === inputFilter.dueDate || inputFilter.dueDate === null) && arrData.status === inputFilter.status) {
                    
                    temp.push(resultJSX(arrData, index, arrData.id));

                }

            }

            else {
                temp.push(resultJSX(arrData, index, arrData.id));
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

                {btnState ? <TaskBtn send={setBtnState} name="Add Task" />                               : <AddTask send={{ setBtnState, setUpdateData, updateData, setFilterState }} />}
                {filterBtnState ? <TaskBtn send={setFilterBtnState} name="Filters" />                    : <SearchFilters send={{ setFilterBtnState, setFilterState, setUpdateData, updateData, inputFilter, setInputFilter }} />}
                <button className={styles.btn} onClick={displayAll}>Display All</button>
                {showDataBox ? <><h3>Results</h3><div className={styles.showDataBox}>{showData}</div></> : <h3>{showNull}</h3>}
            
            </div>
        
        </>
    )
}

function TaskBtn(props) {

    function changeState() {
        props.send(false);
    }

    return <button className={styles.btn} onClick={changeState}>{props.name}</button>;
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
            <input className={styles.input} type='text' autoFocus onChange={(e) => { setGetInputData({ taskName: e.target.value, status: getInputData.status, dueDate: getInputData.dueDate }) }} placeholder="Add New Task" />
            
            <div>
                <label  className={styles.label}>Status </label>
                
                <select className={styles.select} onChange={(e) => { setGetInputData({ taskName: getInputData.taskName, status: e.target.value, dueDate: getInputData.dueDate }) }}>
                    
                    <option value='pending'>pending    </option>
                    <option value='completed'>Completed</option>
                
                </select>

            </div>
            
            <div>
                
                <label className={styles.label}>Due Date </label>
                <input className={styles.input} type="date" onChange={(e) => { setGetInputData({ taskName: getInputData.taskName, status: getInputData.status, dueDate: e.target.value }) }} />
            
            </div>

            <input  className={styles.subBtn} type="submit" />
            <button className={styles.clsBtn} onClick={close}>Close</button>
        
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

        <form className={styles.form} onSubmit={filterData}>
            
            <input  className={styles.input} type="text" onChange={(e) => props.send.setInputFilter({ taskName: e.target.value, dueDate: props.send.inputFilter.dueDate, status: props.send.inputFilter.status })} placeholder="Search Text" />
            
            <select className={styles.select} onChange={(e) => props.send.setInputFilter({ taskName: props.send.inputFilter.taskName, dueDate: props.send.inputFilter.dueDate, status: e.target.value })}>
                
                <option value='pending'>pending    </option>
                <option value='completed'>Completed</option>
            
            </select>
            
            <input  className={styles.input} type="date" onChange={(e) => props.send.setInputFilter({ taskName: props.send.inputFilter.taskName, dueDate: e.target.value, status: props.send.inputFilter.status })} />
            <input  className={styles.subBtn} type="submit" />
            
            <button className={styles.clsBtn} onClick={close}>Close</button>
        </form>

    )
}

export default CheckTaskUrl;