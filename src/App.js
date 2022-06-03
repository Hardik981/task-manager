import './App.css';
import React, { Suspense } from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
const Users = React.lazy(() => import('./pages/Users'));
const NoPage = React.lazy(() => import('./pages/NoPage'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
function App() {
  const myErrorHandler = (error) => {
    console.log("🚀 ~ file: App.js ~ line 12 ~ myErrorHandler ~ error", error)
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<h1>...Loading</h1>}>
          <ErrorBoundary FallbackComponent={<Link to="/">Home</Link>} onError={myErrorHandler}>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/:id" element={<Tasks />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </HashRouter>
          </ErrorBoundary>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
