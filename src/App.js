import Login from './AuthPages/Login';
import Signup from './AuthPages/Signup';
import ResetPassword from './AuthPages/ResetPassword';
import Home from './Home'
import {
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/forgot-password' element={<ResetPassword />} />
          <Route exact path='/todos' element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
