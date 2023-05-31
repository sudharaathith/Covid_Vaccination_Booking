import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
      <Routes>
        <Route element={<HomePage />} path='/' exact/>
        <Route element={<LoginPage />} path='/login'/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
