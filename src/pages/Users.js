import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../redux/dataReducer';
import styles from '../css/users.module.css'
function Users() {
    const data = useSelector((state) => state.getData.data);
    const dispatch = useDispatch();
    const [state, setState] = useState(true);
    const [showDisplayDataBox, changeShowDisplayDataBox] = useState(false);
    const listNames = data.map(function (data, index) {
        let sendData = {
            name: data.name,
            index: index
        }
        return (
            <div key={data.id} className={styles.displayData}>
                <Link to={`/${data.name}`} state={sendData}>{data.name}</Link>
                <button onClick={() => removeItem(data.id)}>Remove</button>
            </div>
        )
    });
    useEffect(() => {
        if (data?.length > 0) changeShowDisplayDataBox(true);
    }, []);
    useEffect(() => {
        data?.length > 0 ? changeShowDisplayDataBox(true) : changeShowDisplayDataBox(false);
    }, [data]);
    function removeItem(id) {
        dispatch(deleteUser(id));
    }
    return (
        <>
            <h2 className={styles.heading}>Users</h2>
            <div className={styles.bodySpace}>
                {state ? <Btn send={setState} /> : <TakeUser send={setState} />}
                {showDisplayDataBox ? <div className={styles.displayDataBox}>{listNames}</div> : <></>}
            </div>
        </>
    )
}
function Btn(props) {
    function changeState() {
        props.send(false);
    }
    return <button className={styles.addUsrBtn} onClick={changeState}>Add User</button>;
}
function TakeUser(props) {
    const data = useSelector((state) => state.getData.data);
    const [inputData, changeInputData] = useState();
    const dispatch = useDispatch();
    const [uniWrg, changeUniWrg] = useState(0);
    useEffect(() => {
        if (uniWrg > 0) {
            window.alert("Values Should be Unique");
        }
    }, [uniWrg]);
    function setInputData(e) {
        e.preventDefault();
        let result = false;
        data.map(function (data) {
            if (inputData?.toLowerCase() === data.name?.toLowerCase()) { result = true };
        })
        if (result) {
            changeUniWrg(uniWrg + 1);
        }
        else {
            dispatch(addUser({ name: inputData, id: Date.now() }));
            props.send(true);
        }
    }
    return (
        <>
            <form onSubmit={setInputData} className={styles.addUsrForm}>
                <label className={styles.addUsrLabel}>Enter the Name</label>
                <input type="text" autoFocus className={styles.addUsrInput} onChange={(e) => changeInputData(e.target.value)} />
                <input type="submit" className={styles.addUsrSubmit} />
            </form>
        </>
    )
}

export default Users;