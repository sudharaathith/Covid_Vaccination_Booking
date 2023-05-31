import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import NavBar from "./Components/NavBar";
import PriviteRoute from "./Utils/PriviteRoute";
import { AuthProvider } from "./Contex/AuthContex";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route
              element={
                <PriviteRoute>
                  <HomePage />
                </PriviteRoute>
              }
              path="/"
              exact
            />
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
