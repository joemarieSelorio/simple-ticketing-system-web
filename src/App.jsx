import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            {/* Add more protected routes as needed */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;