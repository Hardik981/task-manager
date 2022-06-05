import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../redux/dataReducer';
const { v4: uuidv4 } = require('uuid');
function Users() {
    const data = useSelector((state) => state.getData.data);
    const dispatch = useDispatch();
    const [state, setState] = useState(true);
    const listNames = data.map(function (data, index) {
        let sendData = {
            name: data.name,
            index: index
        }
        return (
            <div key={data.id} className="displayData">
                <Link to={`/${data.name}`} state={sendData}>{data.name}</Link>
                <button onClick={() => removeItem(index)}>Remove</button>
            </div>
        )
    });
    function removeItem(index) {
        dispatch(deleteUser(index));
    }
    return (
        <>
            <h2>Users</h2>
            <section>
                {state ? <Btn send={setState} /> : <TakeUser send={setState} />}
                <div>{listNames}</div>
            </section>
        </>
    )
}
function Btn(props) {
    function changeState() {
        props.send(false);
    }
    return <button onClick={changeState}>Add User</button>;
}
function TakeUser(props) {
    const data = useSelector((state) => state.getData.data);
    const inputData = useRef();
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
            if (inputData.current.value.toLowerCase() === data.name.toLowerCase()) { result = true };
        })
        if (result) {
            changeUniWrg(uniWrg + 1);
        }
        else {
            let id = uuidv4();
            dispatch(addUser({ name: inputData.current.value, id: id }));
            props.send(true);
        }
    }
    return (
        <>
            <form onSubmit={setInputData}>
                <label style={{ marginBottom: 0 }}>Enter the Name</label>
                <input type="text" autoFocus ref={inputData} />
                <input type="submit" />
            </form>
        </>
    )
}

export default Users;