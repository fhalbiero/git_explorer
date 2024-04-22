import { useState, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

import { Layout } from './layout/Layout';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout isLogged={isLogged}/>}>
          {AppRoutes.map((route) => {
            if (route.requiresAuth && !isLogged) {
              return (
                <Route 
                  key={route.path}
                  path={route.path} 
                  element={<Navigate to="/login" />} 
                />
              );
            }
            return (
              <Route 
                key={route.path}
                path={route.path} 
                element={
                  <route.component 
                    setIsLogged={setIsLogged} 
                    setUsername={setUsername} 
                    username={username} 
                  />
                } 
              />
            )
          })}
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
