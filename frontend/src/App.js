import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import { AuthProvider } from "./Contex/AuthContex";
import CentersPage from "./Page/CentersPage";

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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
