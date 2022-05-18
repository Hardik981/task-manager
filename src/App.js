import './App.css';
import { Users } from "./pages/Users";
import { useState, createContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Tasks } from "./pages/Tasks";
export const DataContext = createContext();
function App() {
  const [data, changeData] = useState([]);
  return (
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
  );
}

export default App;
