import './App.css';
import { Users } from "./pages/Users";
import { HashRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Tasks } from "./pages/Tasks";
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:id" element={<Tasks />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
