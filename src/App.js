import './App.css';
import React, { Suspense }           from 'react';
import { store }                     from './redux/store';
import { Provider }                  from 'react-redux';
import { HashRouter, Routes, Route } from "react-router-dom";

const Users  = React.lazy(() => import('./pages/Users'));
const NoPage = React.lazy(() => import('./pages/NoPage'));
const Tasks  = React.lazy(() => import('./pages/Tasks'));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <Suspense fallback={<h1>...Loading</h1>}>
            
            <HashRouter>
              <Routes>
                
                <Route path="/"    element={<Users  />} />
                <Route path="/:id" element={<Tasks  />} />
                <Route path="*"    element={<NoPage />} />
              
              </Routes>
            </HashRouter>

        </Suspense>

      </div>
    </Provider>
  );
}

export default App;
