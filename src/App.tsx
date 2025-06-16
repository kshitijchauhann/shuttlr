import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import SignUp from "./pages/SignUp.tsx";
import UserProfile from "./pages/UserProfile.tsx"
import History from "./pages/FileHistory.tsx";
import Requests from "./pages/Requests.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/forgot" element={<ForgotPassword/>}/>
      
      {/* Protected Routes */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      }/>
      <Route path="/history" element={
        <ProtectedRoute>
          <History/>
        </ProtectedRoute>
      }/>
      <Route path="/request" element={
        <ProtectedRoute>
          <Requests/>
        </ProtectedRoute>
      }/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
    </Routes>
    </BrowserRouter>
  )
}


export default App;
