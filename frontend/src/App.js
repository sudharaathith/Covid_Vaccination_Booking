import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import { AuthProvider } from "./Contex/AuthContex";
import CentersPage from "./Page/CentersPage";
import PriviteRoute, { AdminRoute } from './Utils/PriviteRoute'
import BookingPage from "./Page/BookingPage";
import AdminPage from "./Page/AdminPage";
import AddPage from "./Page/AddPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              element={
                  <HomePage />
                
              }
              path="/"
              exact
            />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<CentersPage />} path='/centers' />
            <Route element={<PriviteRoute ><BookingPage /></PriviteRoute>} path="/booking" />
            <Route element={<AdminRoute><AdminPage /></AdminRoute>} path="/editor" />
            <Route element={<AdminRoute><AddPage /></AdminRoute>} path="/add" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
