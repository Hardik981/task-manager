import './App.css';
import { Users } from "./pages/Users";
import { useState, createContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Tasks } from "./pages/Tasks";
import store from './redux/store';
import { Provider } from 'react-redux';

export const DataContext = createContext();
function App() {
  const [data, changeData] = useState([]);
  return (
    <Provider store={store}>
    <DataContext.Provider value={{data,changeData}}>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:id" element={<Tasks />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </HashRouter>
      </div>
    </DataContext.Provider>
    </Provider>
  );
}

export default App;
