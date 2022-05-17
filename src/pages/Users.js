import { useState, useContext, useRef } from 'react';
import { DataContext } from '../App';
import { Link } from "react-router-dom";
export function Users() {
    const [state, setState] = useState(true);
    const setData = useContext(DataContext);
    const nameRefs = useRef([]);
    const listNames = setData.data.map(function (data, index) {
        let sendData = {
            name: data.name,
            index: index
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '20px 0px' }}>
                <Link to={`/${data.name}`} state={sendData} contentEditable="false" ref={(element) => { nameRefs.current[index] = element }}>{data.name}</Link>
                <button onClick={() => editName(index)}>Edit</button>
                <button onClick={() => removeItem(index)}>Remove</button>
            </div>
        )
    }
    );
    function editName(index) {
        nameRefs.current[index].contentEditable = "true";
        nameRefs.current[index].focus();
    }
    function removeItem(index) {
        let temp = [...setData.data];
        temp.splice(index, 1);
        setData.changeData(temp);
    }
    return (
        <>
            <h3>Users</h3>
            {state ? <Btn send={setState} /> : <TakeUser send={setState} />}
            <div>{listNames}</div>
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
    const inputData = useRef();
    const setData = useContext(DataContext);
    function setInputData(e) {
        e.preventDefault();
        setData.changeData([...setData.data, { name: inputData.current.value, tasks: [] },])
        props.send(true);
        console.log(setData.data);
    }
    return (
        <>
            <form onSubmit={setInputData}>
                <label style={{ marginBottom: 0 }}>Enter the Name</label>
                <input type="text" ref={inputData} />
                <input type="submit" />
            </form>
        </>
    )
}
