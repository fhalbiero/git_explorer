import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { AbountUs } from './pages/AboutUs';
import { Users } from './pages/Users';
import { NotFound } from './pages/NotFound';
import { UserProfile } from './pages/UserProfile';
import { SearchUser } from './components/SearchUser';
import { Layout } from './layout/Layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout isLogged={true}/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AbountUs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/user/:username" element={<UserProfile />} />
        <Route path="/search" element={<SearchUser />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
